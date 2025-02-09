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


export type DraftTicket = Omit<Ticket, 'ticket_id'>