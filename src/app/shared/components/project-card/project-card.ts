import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CampaignResponse as Campagne } from '../../../models/campaign.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full animate-in fade-in duration-300">

      <!--
        FIX: previously had TWO class="" attributes on this div.
        The second (bg-cover bg-center) silently overwrote the first.
        Merged into a single class binding.
      -->
      <div
        class="h-48 bg-slate-100 p-6 flex flex-col justify-between items-start bg-cover bg-center"
        [style.backgroundImage]="campagne.imageUrl ? 'url(' + campagne.imageUrl + ')' : 'none'">

        <div class="flex justify-between items-center w-full">
          <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90"
                [ngClass]="{
                  'text-orange-700': campagne.categorie === 'Énergie',
                  'text-sky-700': campagne.categorie === 'Éducation',
                  'text-emerald-700': campagne.categorie === 'Agriculture',
                  'text-pink-700': campagne.categorie === 'Artisanat',
                  'text-slate-700': !['Énergie','Éducation','Agriculture','Artisanat'].includes(campagne.categorie)
                }">
            {{ campagne.categorie }}
          </span>

          @if (campagne.montantCollecte >= campagne.objectifCfa) {
            <span class="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
              ✓ Financée
            </span>
          }
        </div>
      </div>

      <div class="p-6 flex-1 flex flex-col">
        <h3 class="text-xl font-bold text-slate-800 mb-2">{{ campagne.titre }}</h3>
        <p class="text-slate-500 text-sm mb-4 flex-1 line-clamp-2">{{ campagne.description }}</p>

        <!-- Progress -->
        <div class="space-y-3 mt-auto">
          <div class="flex justify-between items-baseline text-sm">
            <span class="font-bold text-slate-800">{{ campagne.montantCollecte | number }} FCFA</span>
            <span class="text-xs text-slate-400">objectif {{ campagne.objectifCfa | number }} FCFA</span>
          </div>

          <div class="w-full bg-slate-100 rounded-full h-2">
            <div
              class="bg-amber-500 h-2 rounded-full transition-all duration-500"
              [style.width.%]="campagne.pourcentageAtteint">
            </div>
          </div>

          <div class="flex justify-between text-xs text-slate-500 pt-1">
            <span class="font-medium text-amber-600">{{ campagne.pourcentageAtteint }}% financé</span>
            <span>🕒 {{ campagne.joursRestants }} jours restants</span>
          </div>
        </div>
      </div>

      <div class="p-6 pt-0 mt-auto">
        <a [routerLink]="['/campaigns', campagne.id]"
           class="w-full block text-center bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-all text-sm">
          Voir la campagne →
        </a>
      </div>
    </div>
  `
})
export class ProjectCardComponent {
  @Input() campagne!: Campagne;
}
