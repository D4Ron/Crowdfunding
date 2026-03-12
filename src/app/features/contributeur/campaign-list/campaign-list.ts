import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContributionService } from '../../../core/services/contribution.service';
import { ContributionResponse } from '../../../models/contribution.model';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="p-8 space-y-8 animate-in fade-in duration-500">

      <div class="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 class="text-3xl font-bold text-slate-800">Campagnes soutenues</h1>
          <p class="text-slate-500 mt-1">Les projets que vous avez financés.</p>
        </div>
      </div>

      @if (loading) {
        <div class="flex justify-center py-20">
          <div class="w-10 h-10 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin"></div>
        </div>
      }

      @if (!loading) {
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          @for (c of supportedCampaigns; track c.campaignId) {
            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              <div class="p-6 flex-1 flex flex-col">
                <h3 class="text-lg font-bold text-slate-800 mb-2">{{ c.campaignTitre }}</h3>
                <div class="mt-auto pt-4">
                  <span class="text-xs font-bold uppercase px-3 py-1 rounded-full"
                        [class]="statutClass(c.statut)">
                    {{ statutLabel(c.statut) }}
                  </span>
                  <p class="text-sm font-black text-slate-900 mt-3">{{ c.montant | number }} FCFA</p>
                  <p class="text-xs text-slate-400 mt-1">{{ c.createdAt | date:'dd/MM/yyyy' }}</p>
                </div>
              </div>
              <div class="p-6 pt-0">
                <a [routerLink]="['/campaigns', c.campaignId]"
                   class="w-full block text-center border-2 border-slate-100 hover:border-amber-300 hover:bg-amber-50 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-all text-sm">
                  Voir la campagne →
                </a>
              </div>
            </div>
          } @empty {
            <div class="col-span-full bg-white p-16 rounded-2xl text-center border border-slate-100 shadow-sm">
              <div class="text-6xl mb-4">🚀</div>
              <h3 class="text-xl font-bold text-slate-700">Aucune campagne soutenue</h3>
              <p class="text-slate-500 mt-2 max-w-md mx-auto">Découvrez des projets passionnants et faites votre première contribution.</p>
              <a routerLink="/campaigns"
                 class="inline-block mt-8 bg-amber-500 text-white px-6 py-3 rounded-full text-sm font-bold">
                Explorer les projets
              </a>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class CampaignListComponent implements OnInit {
  private contributionService = inject(ContributionService);

  supportedCampaigns: ContributionResponse[] = [];
  loading = true;

  ngOnInit() {
    this.contributionService.getMyContributions().subscribe({
      next: (contributions) => {
        // Show only successful contributions, deduplicated by campaign
        const seen = new Set<number>();
        this.supportedCampaigns = contributions.filter(c => {
          if (c.statut !== 'SUCCESS') return false;
          if (seen.has(c.campaignId)) return false;
          seen.add(c.campaignId);
          return true;
        });
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  statutLabel(s: string): string {
    const map: Record<string, string> = {
      SUCCESS: 'Réussie', PENDING: 'En attente', FAILED: 'Échouée'
    };
    return map[s] ?? s;
  }

  statutClass(s: string): string {
    const map: Record<string, string> = {
      SUCCESS: 'bg-green-100 text-green-700',
      PENDING: 'bg-amber-100 text-amber-700',
      FAILED: 'bg-red-100 text-red-700'
    };
    return map[s] ?? 'bg-slate-100 text-slate-500';
  }
}