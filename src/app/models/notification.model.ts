export type NotificationType =
  | 'CONTRIBUTION_RECEIVED'
  | 'CAMPAIGN_VALIDATED'
  | 'CAMPAIGN_REJECTED'
  | 'MILESTONE_50'
  | 'MILESTONE_100';

export interface NotificationResponse {
  id: number;
  message: string;
  type: NotificationType;
  lu: boolean;
  createdAt: string;
}
