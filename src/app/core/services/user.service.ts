import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/users`;
  constructor(private http: HttpClient) {}

  getMe(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  updateMe(data: { nom?: string; telephone?: string }): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/me`, data);
  }
}
