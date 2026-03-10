import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDashboardStore } from '../../../core/admin-dashboard.store';
import { AdminService } from '../../../core/services/admin.service';
import { CampaignResponse } from '../../../models/campaign.model';

@Component({
    selector: 'app-admin-campaigns',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-campaigns.html',
    styleUrl: './admin-campaigns.scss'
})
export class AdminCampaigns implements OnInit {
    private store = inject(AdminDashboardStore);
    private adminService = inject(AdminService);

    readonly campaigns = computed(() => this.store.campaigns());
    readonly query = signal('');
    readonly actionLoading = signal<number | null>(null);
    readonly rejectReason = signal('');
    readonly rejectingId = signal<number | null>(null);

    ngOnInit(): void {
        this.store.loadAll();
    }

    filtered() {
        const q = this.query().toLowerCase();
        return q
            ? this.campaigns().filter(c =>
                c.titre.toLowerCase().includes(q) ||
                c.porteurNom.toLowerCase().includes(q) ||
                c.categorie.toLowerCase().includes(q)
            )
            : this.campaigns();
    }

    percent(c: CampaignResponse): number {
        if (!c.montantCollecte || !c.objectifCfa || c.objectifCfa <= 0) return 0;
        return Math.min(100, Math.round((c.montantCollecte / c.objectifCfa) * 100));
    }

    statusLabel(s: string): string {
        const map: Record<string, string> = {
            EN_ATTENTE_VALIDATION: 'En attente',
            ACTIVE: 'Active',
            REJETEE: 'Rejetée',
            BROUILLON: 'Brouillon',
            FINANCEE: 'Financée',
            EXPIREE: 'Expirée',
        };
        return map[s] ?? s;
    }

    statusClass(s: string): string {
        const map: Record<string, string> = {
            EN_ATTENTE_VALIDATION: 'pending',
            ACTIVE: 'validated',
            REJETEE: 'rejected',
            BROUILLON: 'draft',
            FINANCEE: 'funded',
            EXPIREE: 'expired',
        };
        return map[s] ?? '';
    }

    validate(id: number): void {
        this.actionLoading.set(id);
        this.adminService.validateCampaign(id).subscribe({
            next: (updated) => {
                this.store.updateCampaign(updated);
                this.actionLoading.set(null);
            },
            error: () => this.actionLoading.set(null)
        });
    }

    startReject(id: number): void {
        this.rejectingId.set(id);
        this.rejectReason.set('');
    }

    confirmReject(): void {
        const id = this.rejectingId();
        if (id === null) return;
        this.actionLoading.set(id);
        this.adminService.rejectCampaign(id, this.rejectReason() || 'Non conforme').subscribe({
            next: (updated) => {
                this.store.updateCampaign(updated);
                this.actionLoading.set(null);
                this.rejectingId.set(null);
            },
            error: () => this.actionLoading.set(null)
        });
    }

    cancelReject(): void {
        this.rejectingId.set(null);
    }
}
