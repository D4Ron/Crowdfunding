import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../../../core/services/campaign.service'; // Utilisation du service corrigé
import { CampaignResponse as Campagne } from '../../../models/campaign.model';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  // Importation du CommonModule pour le pipe async et du composant partagé pour l'affichage
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <div class="p-8 space-y-8 animate-in fade-in duration-500">
      
      <div class="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 class="text-3xl font-bold text-slate-800">Campagnes soutenues</h1>
          <p class="text-slate-500 mt-1">Suivez l'évolution des projets que vous financez.</p>
        </div>
        <button class="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2">
          <i>🔍</i> Découvrir d'autres campagnes
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        @for (campagne of campaigns$ | async; track campagne.id) {
          <app-project-card [campagne]="campagne"></app-project-card>
        } @empty {
          <div class="col-span-full bg-white p-16 rounded-2xl text-center border border-slate-100 shadow-sm">
            <div class="text-6xl mb-4">🚀</div>
            <h3 class="text-xl font-bold text-slate-700">Aucune campagne soutenue pour le moment</h3>
            <p class="text-slate-500 mt-2 max-w-md mx-auto">C'est le moment idéal pour découvrir des projets passionnants et faire votre première contribution !</p>
            <button class="mt-8 bg-amber-500 text-white px-6 py-3 rounded-full text-sm font-bold">Explorer les projets</button>
          </div>
        }
      </div>
    </div>
  `
})
export class CampaignListComponent implements OnInit {
  // Injection moderne du service de campagnes
  private campaignService = inject(CampaignService);

  // Observable qui contiendra la liste des campagnes
  campaigns$!: Observable<Campagne[]>;

  ngOnInit() {
    // Récupération dynamique des données au chargement de la page
    this.campaigns$ = this.campaignService.getActiveCampaigns();
  }
}