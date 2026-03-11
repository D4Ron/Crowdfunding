import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CampaignResponse } from '../../models/campaign.model';
import { ContributionResponse } from '../../models/contribution.model';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private apiUrl = `${environment.apiUrl}/api/admin`;

  constructor(private http: HttpClient) { }

  // Campaigns
  getPendingCampaigns(): Observable<CampaignResponse[]> {
    return this.http.get<CampaignResponse[]>(`${this.apiUrl}/campaigns/pending`);
  }

  getAllCampaigns(): Observable<CampaignResponse[]> {
    return this.http.get<CampaignResponse[]>(`${this.apiUrl}/campaigns`);
  }

  validateCampaign(id: number): Observable<CampaignResponse> {
    return this.http.patch<CampaignResponse>(
      `${this.apiUrl}/campaigns/${id}/validate`, {});
  }

  rejectCampaign(id: number, raison: string): Observable<CampaignResponse> {
    return this.http.patch<CampaignResponse>(
      `${this.apiUrl}/campaigns/${id}/reject?raison=${encodeURIComponent(raison)}`, {});
  }

  // Users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  suspendUser(id: number): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${id}/suspend`, {});
  }

  reactivateUser(id: number): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${id}/reactivate`, {});
  }

  banUser(id: number): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${id}/ban`, {});
  }

  // Transactions
  getAllTransactions(): Observable<ContributionResponse[]> {
    return this.http.get<ContributionResponse[]>(`${this.apiUrl}/transactions`);
  }

  // Commission
  updateCommission(rate: number): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(
      `${this.apiUrl}/commission?rate=${rate}`, {});
  }

  // Stats
  getStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }
  getDailyStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats/daily`);
  }
}
