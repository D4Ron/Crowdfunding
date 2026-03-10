import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-creer-campagne',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './creer-campagne.html',
  styleUrl: './creer-campagne.scss'
})
export class CreerCampagneComponent {

  constructor(private router: Router) {}

  isOpen = signal(true);
  soumissionTentee = false;

  categories = [
    'Énergie', 'Éducation', 'Santé', 'Artisanat',
    'Technologie', 'Agriculture', 'Culture', 'Sport'
  ];

  form = {
    titre: '',
    categorie: '',
    localisation: '',
    resume: ''
  };

  get erreurs() {
    return {
      titre: !this.form.titre.trim() ? 'Le titre est requis' : '',
      categorie: !this.form.categorie ? 'La catégorie est requise' : '',
      resume: !this.form.resume.trim() ? 'Le résumé est requis' : ''
    };
  }

  get formulaireValide(): boolean {
    return (
      this.form.titre.trim() !== '' &&
      this.form.categorie !== '' &&
      this.form.resume.trim() !== ''
    );
  }

  fermer() {
    this.isOpen.set(false);
    this.router.navigate(['/porteur/dashboard']);
  }

  annuler() {
    this.fermer();
  }

  enregistrerBrouillon() {
    this.soumissionTentee = true;
    if (!this.formulaireValide) return;
    this.router.navigate(['/porteur/mes-campagnes']);
  }

  soumettre() {
    this.soumissionTentee = true;
    if (!this.formulaireValide) return;
    this.router.navigate(['/porteur/mes-campagnes']);
  }
}