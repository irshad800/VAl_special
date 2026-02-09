import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  trackVisit(): Observable<any> {
    const userAgent = window.navigator.userAgent;
    return this.http.post(`${this.apiUrl}/visit`, { userAgent });
  }

  getVisits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/visits`);
  }
}
