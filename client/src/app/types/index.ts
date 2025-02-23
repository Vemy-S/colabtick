import { FormControl } from "@angular/forms"

export enum Status {
    COMPLETED,
    PENDING,
    FINISHED
}

export interface Ticket  {
    ticket_id: number,
    title: string,
    content: string,
    status: Status
}

export interface ItemForm {
  title: FormControl<string>
  content: FormControl<string>
  status: FormControl<Status>
}

export interface ItemCompanyForm {
  companyName: FormControl<string>,
  accesKey: FormControl<string>
}

export interface Company {
  company_id: string,
  company_name: string,
  company_authorId: number,
  tickets: Ticket[]
  createdAt: Date,
  userRoles: []
  acces_key: string
}

export type DraftCompany = Omit<Company, 'company_id' | 'tickets' | 'userRoles' | 'createdAt' | 'company_authorId'>
export type Companies = Omit<Company, 'acces_key' | 'tickets' | 'userRoles' | 'company_authorId'>[]
export type DraftTicket = Omit<Ticket, 'ticket_id'>