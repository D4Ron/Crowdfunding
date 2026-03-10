import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../../../core/services/campaign.service';
import { CampaignRequest } from '../../../models/campaign.model';

@Component({
  selector: 'app-creer-campagne',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './creer-campagne.html',
  styleUrl: './creer-campagne.scss'
})
export class CreerCampagneComponent {

  constructor(
    private router: Router,
    private campaignService: CampaignService
  ) {}

  isOpen = signal(true);
  soumissionTentee = false;
  saving = signal(false);
  errorMsg = signal('');

  categories = [
    'Énergie', 'Éducation', 'Santé', 'Artisanat',
    'Technologie', 'Agriculture', 'Culture', 'Sport'
  ];

  form = {
    titre: '',
    description: '',
    categorie: '',
    imageUrl: '',
    objectifCfa: null as number | null,
    dateDebut: '',
    dateFin: ''
  };

  get erreurs(): Record<string, string> {
    return {
      titre: !this.form.titre.trim() ? 'Le titre est requis' : '',
      description: !this.form.description.trim() ? 'La description est requise' : '',
      categorie: !this.form.categorie ? 'La catégorie est requise' : '',
      objectifCfa: (!this.form.objectifCfa || this.form.objectifCfa <= 0)
        ? 'L\'objectif en CFA est requis' : '',
      dateDebut: !this.form.dateDebut ? 'La date de début est requise' : '',
      dateFin: !this.form.dateFin
        ? 'La date de fin est requise'
        : (this.form.dateDebut && this.form.dateFin <= this.form.dateDebut)
          ? 'La date de fin doit être après la date de début'
          : ''
    };
  }

  get formulaireValide(): boolean {
    return Object.values(this.erreurs).every(e => !e);
  }

  private buildRequest(): CampaignRequest {
    return {
      titre: this.form.titre.trim(),
      description: this.form.description.trim(),
      categorie: this.form.categorie,
      imageUrl: this.form.imageUrl.trim() || undefined,
      objectifCfa: this.form.objectifCfa!,
      dateDebut: this.form.dateDebut,
      dateFin: this.form.dateFin
    };
  }

  fermer(): void {
    this.isOpen.set(false);
    this.router.navigate(['/porteur/dashboard']);
  }

  annuler(): void {
    this.fermer();
  }

  enregistrerBrouillon(): void {
    this.soumissionTentee = true;
    if (!this.formulaireValide) return;

    this.saving.set(true);
    this.errorMsg.set('');

    // Create as BROUILLON then skip validation submission
    this.campaignService.createCampaign(this.buildRequest()).subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/porteur/mes-campagnes']);
      },
      error: (err) => {
        this.saving.set(false);
        this.errorMsg.set('Erreur lors de la sauvegarde. Veuillez réessayer.');
      }
    });
  }

  soumettre(): void {
    this.soumissionTentee = true;
    if (!this.formulaireValide) return;

    this.saving.set(true);
    this.errorMsg.set('');

    // Create campaign then submit for validation
    this.campaignService.createCampaign(this.buildRequest()).subscribe({
      next: (campaign) => {
        // Submit to validation
        this.campaignService.submitForValidation(campaign.id).subscribe({
          next: () => {
            this.saving.set(false);
            this.router.navigate(['/porteur/mes-campagnes']);
          },
          error: () => {
            // Campaign created but not submitted — still navigate
            this.saving.set(false);
            this.router.navigate(['/porteur/mes-campagnes']);
          }
        });
      },
      error: () => {
        this.saving.set(false);
        this.errorMsg.set('Erreur lors de la création. Veuillez réessayer.');
      }
    });
  }
}
