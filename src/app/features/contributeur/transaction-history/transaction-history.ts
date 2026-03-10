import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributionService } from '../../../core/services/contribution.service';
import { ContributionResponse as Contribution } from '../../../models/contribution.model';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-history.html'
})
export class TransactionHistory {
  transactions = [
    {
      date: '15 Fév 2026',
      reference: 'LVN-TRX-20481',
      campagne: 'Ferme Solaire Kaolack',
      methode: 'Mobile Money',
      montant: 350000,
      statut: 'Réussie'
    },
    {
      date: '02 Fév 2026',
      reference: 'LEV-2026-98431',
      campagne: 'Coopérative Agricole de Thiès',
      methode: 'Virement Bancaire',
      montant: 500000,
      statut: 'Réussie'
    },
    {
      date: '28 Jan 2026',
      reference: 'TXN-LVA-55210',
      campagne: 'Atelier Textile Bamako',
      methode: 'Carte Bancaire',
      montant: 200000,
      statut: 'En attente'
    },
    {
      date: '25 Jan 2026',
      reference: 'LVN-ERR-99210',
      campagne: 'Clinique Mobile Santé',
      methode: 'Carte Bancaire',
      montant: 50000,
      statut: 'Échouée'
    }
  ];
}