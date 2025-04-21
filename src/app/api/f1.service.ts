import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class F1Service {
  private baseUrl = 'https://localhost:7161/api/Standings';

  constructor(private http: HttpClient) { }
  
  getCurrentDriverStandings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/currentDriver`);
  }
  getCurrentConstructorStandings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/currentConstructor`);
  }
}
