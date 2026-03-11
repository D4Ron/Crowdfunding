import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContributionRequest, ContributionResponse } from '../../models/contribution.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContributionService {

  private apiUrl = `${environment.apiUrl}/api/contributions`;

  constructor(private http: HttpClient) { }

  contribute(campaignId: number, request: ContributionRequest): Observable<ContributionResponse> {
    return this.http.post<ContributionResponse>(
      `${this.apiUrl}/campaign/${campaignId}`, request);
  }

  getMyContributions(): Observable<ContributionResponse[]> {
    return this.http.get<ContributionResponse[]>(`${this.apiUrl}/my`);
  }

  getCampaignContributions(campaignId: number): Observable<ContributionResponse[]> {
    return this.http.get<ContributionResponse[]>(
      `${this.apiUrl}/campaign/${campaignId}`);
  }
}
