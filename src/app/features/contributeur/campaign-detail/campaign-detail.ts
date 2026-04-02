import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContributionService } from '../../../core/services/contribution.service';
import { CampaignService } from '../../../core/services/campaign.service';
import { AuthService } from '../../../core/services/auth.service';
import { CampaignResponse } from '../../../models/campaign.model';
import { Navbar } from '../../../pages/landing/navbar/navbar';
import { Footer } from '../../../pages/landing/footer/footer';

@Component({
  selector: 'app-campaign-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Navbar, Footer],
  templateUrl: './campaign-detail.html'
})
export class CampaignDetail implements OnInit {
  campagne: CampaignResponse | null = null;
  montantDon: number = 5000;
  telephone: string = '';
  methodePaiement: 'moov_tg' | 'togocel' = 'moov_tg';
  isProcessing = false;
  loadError = '';
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private contributionService: ContributionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.loadError = 'Identifiant de campagne invalide.';
      return;
    }
    this.campaignService.getCampaignById(id).subscribe({
      next: (data) => (this.campagne = data),
      error: () => (this.loadError = 'Impossible de charger cette campagne.')
    });
  }

  get pourcentage(): number {
    if (!this.campagne || this.campagne.objectifCfa <= 0) return 0;
    return Math.min(100, Math.round((this.campagne.montantCollecte / this.campagne.objectifCfa) * 100));
  }

  contribuer(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.campagne) return;
    if (!this.montantDon || this.montantDon <= 0) {
      this.errorMessage = 'Veuillez entrer un montant valide.';
      return;
    }
    if (!this.telephone.trim()) {
      this.errorMessage = 'Veuillez entrer votre numéro de téléphone Mobile Money.';
      return;
    }

    this.isProcessing = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.contributionService.contribute(this.campagne.id, {
      montant: this.montantDon,
      telephone: this.telephone.trim(),
      methodePaiement: this.methodePaiement
    }).subscribe({
      next: (res) => {
        this.isProcessing = false;
        this.successMessage = `Contribution réussie ! Référence : ${res.referenceTransaction}`;
        // Reload campaign to update collected amount
        this.campaignService.getCampaignById(this.campagne!.id).subscribe(
          updated => (this.campagne = updated)
        );
      },
      error: () => {
        this.isProcessing = false;
        this.errorMessage = 'La contribution a échoué. Veuillez réessayer.';
      }
    });
  }
}
