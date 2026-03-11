import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';
import { NotificationResponse } from '../../../models/notification.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss']
})
export class Notifications implements OnInit {
  notifications: NotificationResponse[] = [];
  loading = true;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getMyNotifications().subscribe({
      next: (data) => { this.notifications = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  markAllRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: () => this.notifications = this.notifications.map(n => ({ ...n, lu: true }))
    });
  }

  typeIcon(type: string): string {
    const map: Record<string, string> = {
      CONTRIBUTION_RECEIVED: 'success',
      CAMPAIGN_VALIDATED: 'success',
      CAMPAIGN_REJECTED: 'warning',
      MILESTONE_50: 'info',
      MILESTONE_100: 'info'
    };
    return map[type] ?? 'info';
  }
}