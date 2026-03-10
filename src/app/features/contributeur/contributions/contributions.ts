import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contributions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-800 tracking-tight">Mes contributions</h1>
        <p class="text-slate-500 mt-1">Suivez l'évolution des projets que vous financez.</p>
      </div>

      <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div class="p-8 border-b border-slate-50 flex justify-between items-center">
          <h2 class="text-xl font-bold text-slate-800">Mes contributions récentes</h2>
          <button class="text-amber-600 text-sm font-bold hover:underline">Voir tout ></button>
        </div>

        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
              <th class="px-8 py-5">Campagne</th>
              <th class="px-6 py-5">Montant</th>
              <th class="px-6 py-5">Date</th>
              <th class="px-6 py-5">Statut</th>
              <th class="px-6 py-5 text-center">Référence</th>
              <th class="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr *ngFor="let item of contributions" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-8 py-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold shadow-lg">
                    {{ item.campagne.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-bold text-slate-800">{{ item.campagne }}</p>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{{ item.secteur }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-6 font-black text-slate-900">{{ item.montant | number }} FCFA</td>
              <td class="px-6 py-6 text-sm text-slate-500 font-medium">{{ item.date }}</td>
              <td class="px-6 py-6">
                <span [ngClass]="{
                  'bg-green-100 text-green-700': item.statut === 'Réussie',
                  'bg-amber-100 text-amber-700': item.statut === 'En attente'
                }" class="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                  {{ item.statut }}
                </span>
              </td>
              <td class="px-6 py-6 text-center text-[11px] font-mono text-slate-400">{{ item.reference }}</td>
              <td class="px-8 py-6 text-right">
                <div class="flex justify-end gap-3 text-slate-400">
                  <button class="hover:text-amber-600 transition-colors"><i class="ph-file-pdf text-xl"></i></button>
                  <button class="hover:text-slate-900 transition-colors"><i class="ph-share-network text-xl"></i></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ContributionsComponent {
  // Données calquées sur votre historique
  contributions = [
    { campagne: 'Ferme Solaire Kaolack', secteur: 'Énergie', montant: 350000, date: '15 Fév 2026', statut: 'Réussie', reference: 'LVN-TRX-20481' },
    { campagne: 'Coopérative Agricole de Thiès', secteur: 'Agriculture', montant: 500000, date: '02 Fév 2026', statut: 'Réussie', reference: 'LEV-2026-98431' },
    { campagne: 'Atelier Textile Bamako', secteur: 'Artisanat', montant: 200000, date: '28 Jan 2026', statut: 'En attente', reference: 'TXN-LVA-55210' },
    { campagne: 'École Numérique Dakar', secteur: 'Éducation', montant: 150000, date: '10 Déc 2025', statut: 'Réussie', reference: 'LVN-TRX-11092' }
  ];
}