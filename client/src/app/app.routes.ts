import { Routes } from '@angular/router';
import { TicketsComponent } from './components/tickets/tickets.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { CreateTicketComponent } from './components/create-tickets/create-ticket.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: 'tickets', component: TicketsComponent },
    { path: 'tickets/:id', component: TicketDetailComponent },
    { path: 'create', component: CreateTicketComponent },
    { path: 'login', component: LoginComponent }
];
