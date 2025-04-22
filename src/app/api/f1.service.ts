import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class F1Service {
  private baseUrl = 'https://localhost:7161/api';

  constructor(private http: HttpClient) {}

  getCurrentDriverStandings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Standings/currentDriver`);
  }
  getCurrentConstructorStandings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Standings/currentConstructor`);
  }
  getRaceResults(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Races/Results`);
  }
}
