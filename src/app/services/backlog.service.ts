import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BacklogService {
  private apiUrl = 'http://localhost:8080/admin/backlogs';

  constructor(private http: HttpClient) {}

  getByProjet(projetId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projet/${projetId}`);
  }

  createForProjet(projetId: number, payload: any = {}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projet/${projetId}`, payload);
  }

  delete(backlogId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${backlogId}`);
  }
}
