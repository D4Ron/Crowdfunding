import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDashboardStore } from '../../../core/admin-dashboard.store';

@Component({
    selector: 'app-admin-transactions',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-transactions.html',
    styleUrl: './admin-transactions.scss'
})
export class AdminTransactions implements OnInit {
    private store = inject(AdminDashboardStore);
    readonly transactions = computed(() => this.store.transactions());
    readonly query = signal('');

    ngOnInit(): void {
        this.store.loadAll();
    }

    filtered() {
        const q = this.query().toLowerCase();
        return q
            ? this.transactions().filter(t =>
                t.referenceTransaction?.toLowerCase().includes(q) ||
                t.contributeurNom?.toLowerCase().includes(q) ||
                t.campaignTitre?.toLowerCase().includes(q)
            )
            : this.transactions();
    }

    statusLabel(s: string): string {
        const map: Record<string, string> = { SUCCESS: 'Succès', PENDING: 'En attente', FAILED: 'Échoué' };
        return map[s] ?? s;
    }

    statusClass(s: string): string {
        const map: Record<string, string> = { SUCCESS: 'success', PENDING: 'pending', FAILED: 'failed' };
        return map[s] ?? '';
    }

    formatAmount(v: number | null): string {
        if (v === null) return '—';
        return new Intl.NumberFormat('fr-TG').format(v) + ' FCFA';
    }
}
