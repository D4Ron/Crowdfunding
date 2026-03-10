import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContributionService } from '../../../core/services/contribution.service';
import { CampaignService } from '../../../core/services/campaign.service';
import { AuthService } from '../../../core/services/auth.service';
import { ContributionResponse } from '../../../models/contribution.model';
import { CampaignResponse } from '../../../models/campaign.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  nom = 'Contributeur';
  contributions: ContributionResponse[] = [];
  campaigns: CampaignResponse[] = [];
  loading = true;

  constructor(
    private contributionService: ContributionService,
    private campaignService: CampaignService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.nom = this.authService.getNom() ?? 'Contributeur';

    this.contributionService.getMyContributions().subscribe({
      next: (data) => {
        this.contributions = data;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });

    this.campaignService.getActiveCampaigns().subscribe({
      next: (data) => (this.campaigns = data.slice(0, 3)),
      error: () => {}
    });
  }

  get recentContributions(): ContributionResponse[] {
    return this.contributions.slice(0, 5);
  }

  get totalContribue(): number {
    return this.contributions
      .filter(c => c.statut === 'SUCCESS')
      .reduce((sum, c) => sum + c.montant, 0);
  }

  get campagnesSoutenues(): number {
    const ids = new Set(this.contributions.map(c => c.campaignId));
    return ids.size;
  }

  get transactionsReussies(): number {
    return this.contributions.filter(c => c.statut === 'SUCCESS').length;
  }

  get contributionsEnCours(): number {
    return this.contributions.filter(c => c.statut === 'PENDING').length;
  }

  getStatusClass(statut: string): string {
    const map: Record<string, string> = {
      SUCCESS: 'bg-green-100 text-green-700',
      PENDING: 'bg-amber-100 text-amber-700',
      FAILED: 'bg-red-100 text-red-700'
    };
    return map[statut] ?? 'bg-slate-100 text-slate-500';
  }

  getStatusLabel(statut: string): string {
    const map: Record<string, string> = {
      SUCCESS: 'Réussie',
      PENDING: 'En attente',
      FAILED: 'Échouée'
    };
    return map[statut] ?? statut;
  }

  campaignColor(index: number): string {
    const colors = ['#E29141', '#4B62F1', '#4FA96C', '#E25555', '#7C3AED'];
    return colors[index % colors.length];
  }
}
