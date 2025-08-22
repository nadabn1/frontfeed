import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SprintPayload {
  name: string;
  startDate?: string; // 'YYYY-MM-DD'
  endDate?: string;   // 'YYYY-MM-DD'
  statut?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

@Injectable({ providedIn: 'root' })
export class SprintService {
  private apiUrl = 'http://localhost:8080/admin/sprints';

  constructor(private http: HttpClient) {}

  add(backlogId: number, payload: SprintPayload): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/backlog/${backlogId}`, payload);
  }

  delete(sprintId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sprintId}`);
  }

  // (optionnel) si tu ajoutes un endpoint GET côté backend:
  listByBacklog(backlogId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?backlogId=${backlogId}`);
  }
}
