import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContributionService } from '../../../core/services/contribution.service';
import { ContributionResponse } from '../../../models/contribution.model';

@Component({
  selector: 'app-contributions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  // Fixed: was using inline template:, making contributions.html dead code
  templateUrl: './contributions.html',
  providers: [DatePipe]
})
export class ContributionsComponent implements OnInit {
  contributions: ContributionResponse[] = [];
  loading = true;
  error = '';

  constructor(private contributionService: ContributionService) {}

  ngOnInit(): void {
    this.contributionService.getMyContributions().subscribe({
      next: (data) => {
        this.contributions = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger vos contributions.';
        this.loading = false;
      }
    });
  }

  /** Maps API statut (SUCCESS/PENDING/FAILED) to display label */
  statutLabel(statut: string): string {
    const map: Record<string, string> = {
      SUCCESS: 'Réussie',
      PENDING: 'En attente',
      FAILED: 'Échouée'
    };
    return map[statut] ?? statut;
  }

  /** Returns Tailwind classes for the status badge */
  statutClass(statut: string): string {
    const map: Record<string, string> = {
      SUCCESS: 'bg-green-100 text-green-700',
      PENDING: 'bg-amber-100 text-amber-700',
      FAILED: 'bg-red-100 text-red-700'
    };
    return map[statut] ?? 'bg-slate-100 text-slate-600';
  }
}
