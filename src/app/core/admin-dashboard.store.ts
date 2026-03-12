import { Injectable, inject, signal } from '@angular/core';
import { AdminService } from './services/admin.service';
import { CampaignResponse, CampaignStatus } from '../models/campaign.model';
import { User } from '../models/user.model';
import { ContributionResponse } from '../models/contribution.model';

export interface AdminDashboardStats {
    activeCampaigns: number | null;
    registeredUsers: number | null;
    totalCollected: number | null;
    todayTransactions: number | null;
    pendingCampaigns: number | null;
    currentCommission: number | null;
}

export interface StatPoint {
    label: string;
    value: number;
}

export interface DistributionItem {
    label: string;
    value: number;
    color?: string;
}

export interface AdminNotificationItem {
    id: string;
    title: string;
    description?: string | null;
    type: 'info' | 'warning' | 'error' | null;
    timestamp: string | null;
    read: boolean | null;
}

export interface AdminSettingsPref {
    emailNotifications: boolean | null;
    pushNotifications: boolean | null;
}

export interface CommissionChange {
    from: number | null;
    to: number | null;
    author: string | null;
    date: string | null;
}

@Injectable({ providedIn: 'root' })
export class AdminDashboardStore {
    private adminService = inject(AdminService);

    readonly stats = signal<AdminDashboardStats>({
        activeCampaigns: null,
        registeredUsers: null,
        totalCollected: null,
        todayTransactions: null,
        pendingCampaigns: null,
        currentCommission: null,
    });

    readonly campaigns = signal<CampaignResponse[]>([]);
    readonly users = signal<User[]>([]);
    readonly transactions = signal<ContributionResponse[]>([]);
    readonly commissionHistory = signal<CommissionChange[]>([]);
    readonly statSeries = signal<StatPoint[]>([]);
    readonly campaignStatusDist = signal<DistributionItem[]>([]);
    readonly transactionVolume6m = signal<StatPoint[]>([]);
    readonly notifications = signal<AdminNotificationItem[]>([]);
    readonly settings = signal<AdminSettingsPref>({
        emailNotifications: null,
        pushNotifications: null,
    });

    readonly loading = signal(false);
    readonly error = signal<string | null>(null);

    /** Load all admin data from real API endpoints */
    loadAll(): void {
        this.loading.set(true);

        // Load stats
        this.adminService.getStats().subscribe({
            next: (data: any) => {
                this.stats.set({
                    activeCampaigns: data.activeCampaigns ?? data.campagnesActives ?? null,
                    registeredUsers: data.registeredUsers ?? data.utilisateursInscrits ?? null,
                    totalCollected: data.totalCollected ?? data.totalCollecte ?? null,
                    todayTransactions: data.todayTransactions ?? data.transactionsJour ?? null,
                    pendingCampaigns: data.pendingCampaigns ?? data.campagnesEnAttente ?? null,
                    currentCommission: null, // Will be overridden by the specific fetch below
                });
            },
            error: () => this.error.set('Impossible de charger les statistiques')
        });

        // Load commission
        this.adminService.getCommissionRate().subscribe({
            next: (data) => this.stats.update(prev => ({ ...prev, currentCommission: data.currentCommission })),
            error: () => console.error('Impossible de charger le taux de commission')
        });

        // Load campaigns
        this.adminService.getAllCampaigns().subscribe({
            next: (list) => {
                this.campaigns.set(list);
                // Build campaign status distribution from loaded campaigns
                const dist = this.buildCampaignDist(list);
                this.campaignStatusDist.set(dist);
            },
            error: () => this.error.set('Impossible de charger les campagnes')
        });

        // Load users
        this.adminService.getAllUsers().subscribe({
            next: (list) => {
                this.users.set(list);
                this.loading.set(false);
            },
            error: () => {
                this.error.set('Impossible de charger les utilisateurs');
                this.loading.set(false);
            }
        });

        // Load transactions
        this.adminService.getAllTransactions().subscribe({
            next: (list) => this.transactions.set(list),
            error: () => this.error.set('Impossible de charger les transactions')
        });

        // Load daily stats for charts
        this.adminService.getDailyStats().subscribe({
            next: (data: any) => {
                if (Array.isArray(data)) {
                    this.statSeries.set(data.map((d: any) => ({ label: d.date ?? d.label ?? '', value: d.value ?? d.montant ?? 0 })));
                }
            },
            error: () => { } // non-critical
        });
    }

    private buildCampaignDist(campaigns: CampaignResponse[]): DistributionItem[] {
        const statusMap: Record<string, { label: string; color: string }> = {
            ACTIVE: { label: 'Actives', color: '#16a34a' },
            EN_ATTENTE_VALIDATION: { label: 'En attente', color: '#f59e0b' },
            BROUILLON: { label: 'Brouillons', color: '#64748b' },
            REJETEE: { label: 'Rejetées', color: '#ef4444' },
            FINANCEE: { label: 'Financées', color: '#0ea5e9' },
            EXPIREE: { label: 'Expirées', color: '#94a3b8' },
        };
        const counts: Record<string, number> = {};
        for (const c of campaigns) {
            counts[c.statut] = (counts[c.statut] ?? 0) + 1;
        }
        return Object.entries(counts).map(([status, value]) => ({
            label: statusMap[status]?.label ?? status,
            value,
            color: statusMap[status]?.color,
        }));
    }

    // Mutations
    updateCampaign(updated: CampaignResponse): void {
        this.campaigns.update(list => list.map(c => c.id === updated.id ? updated : c));
    }

    removeCampaign(id: number): void {
        this.campaigns.update(list => list.filter(c => c.id !== id));
    }

    updateUser(updated: User): void {
        this.users.update(list => list.map(u => u.id === updated.id ? updated : u));
    }

    updateCommissionRate(rate: number | null): void {
        this.stats.update(prev => ({ ...prev, currentCommission: rate }));
    }

    markAllNotificationsRead(): void {
        this.notifications.update(arr => arr.map(n => ({ ...n, read: true })));
    }

    toggleNotificationRead(id: string): void {
        this.notifications.update(arr => arr.map(n => n.id === id ? { ...n, read: !n.read } : n));
    }

    setSettingsPref(pref: Partial<AdminSettingsPref>): void {
        this.settings.update(prev => ({ ...prev, ...pref }));
    }
}
