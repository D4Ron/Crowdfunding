import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss'
})
export class HowItWorks {
  steps = [
    {
      number: '1',
      icon: '🔍',
      title: 'Découvrez ou présentez un projet',
      description: 'Parcourez les campagnes actives ou préparez votre demande de financement en quelques étapes simples.'
    },
    {
      number: '2',
      icon: '🤝',
      title: 'Contribuez ou collectez en toute clarté',
      description: 'Participez au financement d\'initiatives concrètes ou structurez votre collecte avec transparence.'
    },
    {
      number: '3',
      icon: '📊',
      title: 'Suivez les résultats et l\'avancement',
      description: 'Accédez à un suivi détaillé de chaque campagne et restez informé de l\'impact de vos contributions.'
    }
  ];
}
