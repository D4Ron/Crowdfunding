import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardStore, StatPoint, DistributionItem } from '../../../core/admin-dashboard.store';

@Component({
    selector: 'app-admin-statistics',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-statistics.html',
    styleUrl: './admin-statistics.scss'
})
export class AdminStatistics implements OnInit {
    private store = inject(AdminDashboardStore);
    readonly line = computed(() => this.store.statSeries());
    readonly donut = computed(() => this.store.campaignStatusDist());
    readonly bars = computed(() => this.store.transactionVolume6m());

    ngOnInit(): void { this.store.loadAll(); }

    max(items: { value: number }[]): number {
        return items.length ? Math.max(...items.map(i => i.value)) || 1 : 1;
    }

    donutStyle(): string {
        const list = this.donut();
        const total = list.reduce((a, b) => a + b.value, 0);
        if (!total) return 'conic-gradient(#e5e7eb 0 360deg)';
        let acc = 0;
        const segs = list.map((item, idx) => {
            const pct = (item.value / total) * 360;
            const from = acc;
            acc += pct;
            const color = item.color ?? ['#16a34a', '#f59e0b', '#64748b', '#ef4444'][idx % 4];
            return `${color} ${from}deg ${acc}deg`;
        });
        return `conic-gradient(${segs.join(', ')})`;
    }
}
