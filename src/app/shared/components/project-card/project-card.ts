import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignResponse as Campagne } from '../../../models/campaign.model'; // Import du modèle corrigé
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full animate-in fade-in duration-300">
      
      <div class="h-48 bg-slate-100 p-6 flex flex-col justify-between items-start" 
           [style.backgroundImage]="'url(' + campagne.imageUrl + ')'"
           class="bg-cover bg-center">
        
        <div class="flex justify-between items-center w-full">
          <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                [ngClass]="{
                  'bg-orange-100 text-orange-700': campagne.categorie === 'Énergie',
                  'bg-sky-100 text-sky-700': campagne.categorie === 'Éducation',
                  'bg-emerald-100 text-emerald-700': campagne.categorie === 'Agriculture',
                  'bg-pink-100 text-pink-700': campagne.categorie === 'Artisanat'
                }">
            {{ campagne.categorie }}
          </span>

          @if (campagne.montantCollecte >= campagne.objectifCfa) {
            <span class="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
              <i>✓</i> Financée
            </span>
          }
        </div>
      </div>

      <div class="p-6 flex-1 flex flex-col">
        <h3 class="text-xl font-bold text-slate-800 mb-2">{{ campagne.titre }}</h3>
        <p class="text-slate-500 text-sm mb-6 flex-1 line-clamp-2">{{ campagne.description }}</p>

        <div class="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
          <div class="text-lg font-bold text-slate-800">0 FCFA</div>
        </div>

        <div class="space-y-3 mt-auto">
          <div class="flex justify-between items-baseline text-sm">
            <span class="font-bold text-slate-800">{{ campagne.montantCollecte | number }} FCFA</span>
            <span class="text-xs text-slate-400">sur un objectif de {{ campagne.objectifCfa | number }} FCFA</span>
          </div>
          
          <div class="w-full bg-slate-100 rounded-full h-2">
            <div class="bg-amber-500 h-2 rounded-full transition-all duration-500" 
                 [style.width.%]="(campagne.montantCollecte / campagne.objectifCfa) * 100"></div>
          </div>

          <div class="flex justify-between text-xs text-slate-500 pt-1">
            <span class="font-medium text-amber-600">{{ (campagne.montantCollecte / campagne.objectifCfa) * 100 | number:'1.0-0' }}% financé</span>
            <span class="flex items-center gap-1"><i>🕒</i> {{ campagne.joursRestants }} jours restants</span>
          </div>
        </div>
      </div>

      <div class="p-6 pt-0 mt-auto">
        <a [routerLink]="['/contributeur/campaigns', campagne.id]" 
           class="w-full block text-center bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-all text-sm">
          Voir la campagne →
        </a>
      </div>
    </div>
  `
})
export class ProjectCardComponent {
  @Input() campagne!: Campagne; // Donnée d'entrée obligatoire
}