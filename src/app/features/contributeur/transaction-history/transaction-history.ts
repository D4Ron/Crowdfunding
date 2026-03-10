import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContributionService } from '../../../core/services/contribution.service';
import { ContributionResponse } from '../../../models/contribution.model';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './transaction-history.html'
})
export class TransactionHistory implements OnInit {
  allTransactions: ContributionResponse[] = [];
  loading = true;
  error = '';
  searchQuery = signal('');

  constructor(private contributionService: ContributionService) {}

  ngOnInit(): void {
    this.contributionService.getMyContributions().subscribe({
      next: (data) => {
        this.allTransactions = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger l\'historique.';
        this.loading = false;
      }
    });
  }

  get filtered(): ContributionResponse[] {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.allTransactions;
    return this.allTransactions.filter(t =>
      t.referenceTransaction?.toLowerCase().includes(q) ||
      t.campaignTitre?.toLowerCase().includes(q)
    );
  }

  statutLabel(statut: string): string {
    const map: Record<string, string> = {
      SUCCESS: 'Réussie',
      PENDING: 'En attente',
      FAILED: 'Échouée'
    };
    return map[statut] ?? statut;
  }

  statutClass(statut: string): string {
    const map: Record<string, string> = {
      SUCCESS: 'bg-green-100 text-green-700',
      PENDING: 'bg-amber-100 text-amber-700',
      FAILED: 'bg-red-100 text-red-700'
    };
    return map[statut] ?? 'bg-slate-100 text-slate-500';
  }
}
