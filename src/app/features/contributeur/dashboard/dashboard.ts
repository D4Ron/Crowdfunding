import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html' // Assure-toi que le fichier HTML existe
})
export class DashboardComponent {
  transactions = [
    { id: 1, date: '15 Fév 2026', reference: 'LVN-TRX-20481', campagne: 'Ferme Solaire Kaolack', montant: 350000, statut: 'Réussie' },
    { id: 2, date: '02 Fév 2026', reference: 'LEV-2826-98431', campagne: 'Coopérative Agricole de Thiès', montant: 500000, statut: 'Réussie' }
  ];

  campagnes = [
    { titre: 'Ferme Solaire Kaolack', description: 'Installation de panneaux solaires pour alimenter 500 foyers...', categorie: 'Énergie', color: '#E29141', votreContribution: 350000, financee: false },
    { titre: 'École Numérique Dakar', description: 'Équipement informatique et formation pour une école...', categorie: 'Éducation', color: '#4B62F1', votreContribution: 150000, financee: true },
    { titre: 'Coopérative Agricole de Thiès', description: 'Achat de matériel agricole moderne pour augmenter...', categorie: 'Agriculture', color: '#4FA96C', votreContribution: 500000, financee: false }
  ];

  getStatusClass(status: string) {
    if (status === 'Réussie') return 'bg-green-100 text-green-700';
    if (status === 'En attente') return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  }
}