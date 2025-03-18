import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company, DraftTicket, Ticket } from '../types';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  private readonly BASE_URL = enviroment.apiTicketsUrl

  createTicket(newTicket: DraftTicket, companyId: Company["company_id"] ): Observable<Ticket>{
    return this.http.post<Ticket>(`${this.BASE_URL}/create/${companyId}`, newTicket, {withCredentials: true});
  }
  
  getTickets(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.BASE_URL)
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.BASE_URL}/${id}`);
  }
}
