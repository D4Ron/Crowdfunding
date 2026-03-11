import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CampaignService } from '../../../core/services/campaign.service';
import { CampaignResponse } from '../../../models/campaign.model';

@Component({
  selector: 'app-mes-campagnes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mes-campagnes.html',
  styleUrl: './mes-campagnes.scss'
})
export class MesCampagnesComponent implements OnInit {

  filters = ['Toutes', 'Actives', 'Brouillons', 'Soumises', 'Terminées'];
  activeFilter = signal('Toutes');
  campaigns: CampaignResponse[] = [];
  loading = true;
  error = '';

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.campaignService.getMyCampaigns().subscribe({
      next: (data) => {
        this.campaigns = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger vos campagnes.';
        this.loading = false;
      }
    });
  }

  filteredCampaigns = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'Toutes') return this.campaigns;
    if (filter === 'Actives') return this.campaigns.filter(c => c.statut === 'ACTIVE');
    if (filter === 'Brouillons') return this.campaigns.filter(c => c.statut === 'BROUILLON');
    if (filter === 'Soumises') return this.campaigns.filter(c => c.statut === 'EN_ATTENTE_VALIDATION');
    if (filter === 'Terminées') return this.campaigns.filter(c => c.statut === 'FINANCEE' || c.statut === 'EXPIREE');
    return this.campaigns;
  });

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  statutLabel(statut: string): string {
    const map: Record<string, string> = {
      ACTIVE: 'Active', BROUILLON: 'Brouillon',
      EN_ATTENTE_VALIDATION: 'En attente',
      FINANCEE: 'Financée', EXPIREE: 'Expirée', REJETEE: 'Rejetée'
    };
    return map[statut] ?? statut;
  }

  statutClass(statut: string): string {
    const map: Record<string, string> = {
      ACTIVE: 'active', BROUILLON: 'brouillon',
      EN_ATTENTE_VALIDATION: 'soumise',
      FINANCEE: 'active', EXPIREE: 'terminee', REJETEE: 'terminee'
    };
    return map[statut] ?? '';
  }

  canSubmit(statut: string): boolean {
    return statut === 'BROUILLON';
  }

  submit(id: number): void {
    this.campaignService.submitForValidation(id).subscribe({
      next: (updated) => {
        this.campaigns = this.campaigns.map(c => c.id === id ? updated : c);
      },
      error: () => alert('Erreur lors de la soumission.')
    });
  }

  delete(id: number): void {
    if (!confirm('Supprimer cette campagne ?')) return;
    this.campaignService.deleteCampaign(id).subscribe({
      next: () => { this.campaigns = this.campaigns.filter(c => c.id !== id); },
      error: () => alert('Erreur lors de la suppression.')
    });
  }
}