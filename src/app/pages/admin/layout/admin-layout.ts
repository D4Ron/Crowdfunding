import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
    templateUrl: './admin-layout.html',
    styleUrl: './admin-layout.scss'
})
export class AdminLayout {
    private authService = inject(AuthService);

    readonly nom = this.authService.getNom() ?? 'Admin';
    readonly email = this.authService.getEmail() ?? '';
    readonly initials = (this.nom || '').split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2);

    readonly nav = [
        { title: "Vue d'ensemble", path: '/admin', icon: '#d6b256', exact: true },
        { title: 'Campagnes', path: '/admin/campagnes', icon: '#16a34a', exact: false },
        { title: 'Utilisateurs', path: '/admin/utilisateurs', icon: '#60a5fa', exact: false },
        { title: 'Transactions', path: '/admin/transactions', icon: '#0f766e', exact: false },
        { title: 'Commission', path: '/admin/commission', icon: '#f59e0b', exact: false },
        { title: 'Statistiques', path: '/admin/statistiques', icon: '#334155', exact: false },
        { title: 'Notifications', path: '/admin/notifications', icon: '#ef4444', exact: false },
        { title: 'Paramètres', path: '/admin/parametres', icon: '#111827', exact: false },
        { title: 'Déconnexion', path: '/admin/deconnexion', icon: '#dc2626', exact: false },
    ];
}
