import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardStore } from '../../../core/admin-dashboard.store';

@Component({
    selector: 'app-admin-notifications',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-notifications.html',
    styleUrl: './admin-notifications.scss'
})
export class AdminNotifications implements OnInit {
    private store = inject(AdminDashboardStore);
    readonly notifications = computed(() => this.store.notifications());

    ngOnInit(): void { this.store.loadAll(); }

    markAll(): void { this.store.markAllNotificationsRead(); }
    toggle(id: string): void { this.store.toggleNotificationRead(id); }
}
