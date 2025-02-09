import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DraftTicket, Ticket } from '../types';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  private readonly BASE_URL = enviroment.apiTicketsUrl

  createTicket(newTicket: DraftTicket): Observable<Ticket>{
    console.log(newTicket)
    return this.http.post<Ticket>(`${this.BASE_URL}/create`, newTicket, {withCredentials: true});
  }
  
  getTickets(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.BASE_URL)
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.BASE_URL}/${id}`);
  }
}
