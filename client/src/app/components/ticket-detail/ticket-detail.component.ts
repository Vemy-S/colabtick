import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/ticket-api.service';
import { Ticket } from '../../types';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-ticket-detail',
  imports: [],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})
export class TicketDetailComponent {
  private route = inject(ActivatedRoute)
  private apiService = inject(ApiService)

  id = toSignal<string | null>(this.route.paramMap.pipe(map(params => params.get('id'))))
  ticket = toSignal<Ticket | undefined>(this.apiService.getTicket(Number(this.id())))
  
}
 