import { Component, inject, Signal } from '@angular/core';
import { ApiService } from '../../services/ticket-api.service';
import { Ticket } from '../../types';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-tickets',
  imports: [RouterLink],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  private apiService = inject(ApiService);
  
  signalTickets: Signal<Ticket[] | undefined> = toSignal(this.apiService.getTickets())
}