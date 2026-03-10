import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Notifications</h1>
          <p class="text-slate-500 text-sm">Restez informé de l'évolution de vos soutiens.</p>
        </div>
        <button class="text-amber-600 text-sm font-bold hover:underline">✓ Tout marquer comme lu</button>
      </div>

      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
        <div class="p-6 flex gap-4 hover:bg-slate-50/50 transition-colors border-l-4 border-amber-500">
          <div class="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <i class="ph-check-circle text-xl"></i>
          </div>
          <div class="flex-1">
            <div class="flex justify-between mb-1">
              <h3 class="font-bold text-slate-800 text-sm">Contribution confirmée</h3>
              <span class="text-[10px] text-slate-400 font-medium">Il y a 2 heures</span>
            </div>
            <p class="text-slate-500 text-sm">Votre contribution de 350 000 FCFA pour la Ferme Solaire Kaolack a été reçue.</p>
          </div>
        </div>

        <div class="p-6 flex gap-4 hover:bg-slate-50/50 transition-colors border-l-4 border-transparent">
          <div class="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
            <i class="ph-chart-line-up text-xl"></i>
          </div>
          <div class="flex-1">
            <div class="flex justify-between mb-1">
              <h3 class="font-bold text-slate-800 text-sm">Objectif bientôt atteint !</h3>
              <span class="text-[10px] text-slate-400 font-medium">Il y a 1 jour</span>
            </div>
            <p class="text-slate-500 text-sm">La campagne Ferme Solaire Kaolack a atteint 84% de son objectif.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Notifications {} // Note bien le nom de la classe : Notifications