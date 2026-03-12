import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CampaignService } from '../../../core/services/campaign.service';
import { CampaignResponse } from '../../../models/campaign.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  filters = ['Toutes', 'Actives', 'Brouillons', 'Soumises'];
  activeFilter = signal('Toutes');
  campaigns = signal<CampaignResponse[]>([]);
  loading = true;
  error = '';

  // KPI signals
  totalCollecte = signal(0);
  totalContributeurs = signal(0);
  campagnesActives = signal(0);
  campagnesBrouillon = signal(0);

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.campaignService.getMyCampaigns().subscribe({
      next: (data) => {
        this.campaigns.set(data);
        this.campagnesActives.set(data.filter(c => c.statut === 'ACTIVE').length);
        this.campagnesBrouillon.set(data.filter(c => c.statut === 'BROUILLON').length);
        this.totalCollecte.set(data.reduce((sum, c) => sum + c.montantCollecte, 0));
        this.totalContributeurs.set(data.reduce((sum, c) => sum + c.nombreContributeurs, 0));
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
    const list = this.campaigns();
    if (filter === 'Toutes') return list;
    if (filter === 'Actives') return list.filter(c => c.statut === 'ACTIVE');
    if (filter === 'Brouillons') return list.filter(c => c.statut === 'BROUILLON');
    if (filter === 'Soumises') return list.filter(c => c.statut === 'EN_ATTENTE_VALIDATION');
    return list;
  });

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  statutLabel(statut: string): string {
    const map: Record<string, string> = {
      ACTIVE: 'Active',
      BROUILLON: 'Brouillon',
      EN_ATTENTE_VALIDATION: 'En attente',
      FINANCEE: 'Financée',
      EXPIREE: 'Expirée',
      REJETEE: 'Rejetée'
    };
    return map[statut] ?? statut;
  }

  statutClass(statut: string): string {
    const map: Record<string, string> = {
      ACTIVE: 'active',
      BROUILLON: 'brouillon',
      EN_ATTENTE_VALIDATION: 'soumise',
      FINANCEE: 'active',
      EXPIREE: 'terminee',
      REJETEE: 'terminee'
    };
    return map[statut] ?? '';
  }
}