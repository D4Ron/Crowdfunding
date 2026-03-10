import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CampaignRequest, CampaignResponse } from '../../models/campaign.model';

@Injectable({ providedIn: 'root' })
export class CampaignService {

  private apiUrl = 'http://localhost:8080/api/campaigns';

  constructor(private http: HttpClient) {}

  // Public
  getActiveCampaigns(): Observable<CampaignResponse[]> {
    return this.http.get<CampaignResponse[]>(`${this.apiUrl}/public`);
  }

  getCampaignById(id: number): Observable<CampaignResponse> {
    return this.http.get<CampaignResponse>(`${this.apiUrl}/public/${id}`);
  }

  // Porteur
  getMyCampaigns(): Observable<CampaignResponse[]> {
    return this.http.get<CampaignResponse[]>(`${this.apiUrl}/my`);
  }

  createCampaign(request: CampaignRequest): Observable<CampaignResponse> {
    return this.http.post<CampaignResponse>(this.apiUrl, request);
  }

  updateCampaign(id: number, request: CampaignRequest): Observable<CampaignResponse> {
    return this.http.put<CampaignResponse>(`${this.apiUrl}/${id}`, request);
  }

  deleteCampaign(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  submitForValidation(id: number): Observable<CampaignResponse> {
    return this.http.patch<CampaignResponse>(`${this.apiUrl}/${id}/submit`, {});
  }
  getDashboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard`);
  }
}
