import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ContributionService } from '../../../core/services/contribution.service'; // Ton service

@Component({
  selector: 'app-campaign-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './campaign-detail.html'
})
export class CampaignDetail implements OnInit {
  campagne: any;
  montantDon: number = 5000; // Montant par défaut
  isProcessing: boolean = false;

  constructor(
    private contributionService: ContributionService,
    private router: Router
  ) { }

  ngOnInit() {
    // Ici, tu devrais normalement récupérer l'ID depuis l'URL et charger la campagne
    // Pour l'instant, on utilise tes données de test ou du backend
  }

  contribuer() {
    if (this.montantDon <= 0) return;

    this.isProcessing = true;

    // Simulation de l'objet contribution à envoyer au backend sur la branche ATTAEssoLotie
    const request = {
      montant: this.montantDon,
      telephone: '12345678', // Placeholder, you may want to prompt user for this or get from context
      methodePaiement: 'moov_tg' as 'moov_tg' | 'togocel'
    };

    // Appel au service pour enregistrer dans le backend
    this.contributionService.contribute(this.campagne.id || 1, request).subscribe({
      next: () => {
        // Une fois réussi, on redirige vers la liste des contributions
        setTimeout(() => {
          this.isProcessing = false;
          this.router.navigate(['/contributions']);
        }, 1500); // Petit délai pour l'effet visuel du spinner
      },
      error: (err) => {
        console.error('Erreur lors de la contribution', err);
        this.isProcessing = false;
      }
    });
  }
}