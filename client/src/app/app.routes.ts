import { Routes } from '@angular/router';
import { TicketsComponent } from './components/tickets/tickets.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { CreateTicketComponent } from './components/create-tickets/create-ticket.component';
import { LoginComponent } from './components/login/login.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyComponent } from './components/company/company.component';
import { InvitationValidateComponent } from './components/invitation-validate/invitation-validate.component';

export const routes: Routes = [
    { path: 'tickets', component: TicketsComponent },
    { path: 'tickets/:id', component: TicketDetailComponent },
    { path: 'createTicket', component: CreateTicketComponent },
    { path: 'login', component: LoginComponent },
    { path: 'createCompany', component: CreateCompanyComponent},
    { path: 'company/companies', component: CompaniesComponent },
    { path: 'company/companies/:id', component: CompanyComponent},
    { path: 'validate', component: InvitationValidateComponent }
];
