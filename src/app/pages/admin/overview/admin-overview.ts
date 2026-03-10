import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardStore } from '../../../core/admin-dashboard.store';

@Component({
    selector: 'app-admin-overview',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-overview.html',
    styleUrl: './admin-overview.scss'
})
export class AdminOverview implements OnInit {
    private store = inject(AdminDashboardStore);
    readonly stats = computed(() => this.store.stats());
    readonly loading = computed(() => this.store.loading());

    ngOnInit(): void {
        this.store.loadAll();
    }

    formatAmount(val: number | null): string {
        if (val === null) return '—';
        return new Intl.NumberFormat('fr-TG').format(val) + ' FCFA';
    }
}
