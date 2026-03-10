import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDashboardStore } from '../../../core/admin-dashboard.store';
import { AdminService } from '../../../core/services/admin.service';

@Component({
    selector: 'app-admin-commission',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-commission.html',
    styleUrl: './admin-commission.scss'
})
export class AdminCommission implements OnInit {
    private store = inject(AdminDashboardStore);
    private adminService = inject(AdminService);

    readonly currentRate = computed(() => this.store.stats().currentCommission);
    readonly history = computed(() => this.store.commissionHistory());
    readonly inputRate = signal('');
    readonly saving = signal(false);
    readonly successMsg = signal('');

    ngOnInit(): void {
        this.store.loadAll();
    }

    onUpdate(): void {
        const parsed = parseFloat(this.inputRate());
        if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) return;
        this.saving.set(true);
        this.adminService.updateCommission(parsed).subscribe({
            next: () => {
                this.store.updateCommissionRate(parsed);
                this.saving.set(false);
                this.successMsg.set('Taux mis à jour avec succès !');
                setTimeout(() => this.successMsg.set(''), 3000);
            },
            error: () => this.saving.set(false)
        });
    }
}
