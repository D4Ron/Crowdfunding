import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDashboardStore } from '../../../core/admin-dashboard.store';
import { AdminService } from '../../../core/services/admin.service';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-admin-users',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-users.html',
    styleUrl: './admin-users.scss'
})
export class AdminUsers implements OnInit {
    private store = inject(AdminDashboardStore);
    private adminService = inject(AdminService);

    readonly users = computed(() => this.store.users());
    readonly query = signal('');
    readonly roleFilter = signal<'all' | 'PORTEUR_DE_PROJET' | 'CONTRIBUTEUR'>('all');
    readonly actionLoading = signal<number | null>(null);

    ngOnInit(): void {
        this.store.loadAll();
    }

    filtered() {
        const q = this.query().toLowerCase();
        const role = this.roleFilter();
        return this.users().filter(u => {
            const matchQ = !q || u.nom.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
            const matchRole = role === 'all' || u.role === role;
            return matchQ && matchRole;
        });
    }

    initials(nom: string): string {
        return nom.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '—';
    }

    statusLabel(u: User): string {
        if (u.banni) return 'Banni';
        if (!u.actif) return 'Suspendu';
        return 'Actif';
    }

    statusClass(u: User): string {
        if (u.banni) return 'banned';
        if (!u.actif) return 'suspended';
        return 'active';
    }

    roleLabel(role: string): string {
        const map: Record<string, string> = {
            ADMIN: 'Admin',
            PORTEUR_DE_PROJET: 'Porteur',
            CONTRIBUTEUR: 'Contributeur',
        };
        return map[role] ?? role;
    }

    suspend(id: number): void {
        this.actionLoading.set(id);
        this.adminService.suspendUser(id).subscribe({
            next: (updated) => { this.store.updateUser(updated); this.actionLoading.set(null); },
            error: () => this.actionLoading.set(null)
        });
    }

    reactivate(id: number): void {
        this.actionLoading.set(id);
        this.adminService.reactivateUser(id).subscribe({
            next: (updated) => { this.store.updateUser(updated); this.actionLoading.set(null); },
            error: () => this.actionLoading.set(null)
        });
    }

    ban(id: number): void {
        if (!confirm('Bannir définitivement cet utilisateur ?')) return;
        this.actionLoading.set(id);
        this.adminService.banUser(id).subscribe({
            next: (updated) => { this.store.updateUser(updated); this.actionLoading.set(null); },
            error: () => this.actionLoading.set(null)
        });
    }
}
