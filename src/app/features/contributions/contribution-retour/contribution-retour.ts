import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contribution-retour',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-8 animate-in fade-in zoom-in duration-500">
      
      @if (status === 'success') {
        <div class="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl shadow-lg shadow-green-100">
          <i class="ph ph-check-circle"></i>
        </div>
        <div class="space-y-3">
          <h1 class="text-3xl font-black text-slate-800">Merci pour votre contribution !</h1>
          <p class="text-slate-500 max-w-md mx-auto">Votre paiement a été traité avec succès. Vous recevrez un email de confirmation sous peu.</p>
        </div>
      } @else if (status === 'canceled') {
        <div class="w-24 h-24 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-5xl shadow-lg shadow-amber-100">
          <i class="ph ph-x-circle"></i>
        </div>
        <div class="space-y-3">
          <h1 class="text-3xl font-black text-slate-800">Paiement annulé</h1>
          <p class="text-slate-500 max-w-md mx-auto">La transaction a été annulée. Aucun montant n'a été prélevé sur votre compte.</p>
        </div>
      } @else {
        <div class="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center text-5xl animate-pulse">
          <i class="ph ph-circle-notch animate-spin"></i>
        </div>
        <div class="space-y-3">
          <h1 class="text-3xl font-black text-slate-800">Traitement en cours...</h1>
          <p class="text-slate-500">Veuillez patienter pendant que nous vérifions le statut de votre transaction.</p>
        </div>
      }

      <div class="flex flex-col sm:flex-row gap-4 pt-4">
        <a routerLink="/campaigns" class="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-200">
          Explorer d'autres projets
        </a>
        <a routerLink="/contributeur/transactions" class="px-8 py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all">
          Voir mon historique
        </a>
      </div>
    </div>
  `
})
export class ContributionRetourComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  status: 'success' | 'canceled' | 'pending' = 'pending';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const statusParam = params['status'];
      if (statusParam === 'approved' || statusParam === 'success') {
        this.status = 'success';
      } else if (statusParam === 'canceled' || statusParam === 'declined') {
        this.status = 'canceled';
      } else {
        // Default to success if no explicit fail (custom FedaPay flow)
        this.status = 'success';
      }
    });
  }
}
