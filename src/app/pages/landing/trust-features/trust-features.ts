import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trust-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trust-features.html',
  styleUrl: './trust-features.scss'
})
export class TrustFeatures {
  features = [
    {
      icon: '🛡️',
      title: 'Contribution structurée',
      description: 'Chaque contribution est enregistrée et suivie dans un cadre clair et organisé.'
    },
    {
      icon: '👁️',
      title: 'Visibilité des projets',
      description: 'Les campagnes sont présentées avec toutes les informations nécessaires à une décision éclairée.'
    },
    {
      icon: '📈',
      title: 'Suivi transparent',
      description: 'L\'avancement de chaque campagne est accessible en temps réel pour tous les acteurs.'
    },
    {
      icon: '👥',
      title: 'Expérience fluide pour tous',
      description: 'Contributeurs, porteurs de projets et administrateurs disposent chacun d\'un espace dédié et intuitif.'
    }
  ];
}
