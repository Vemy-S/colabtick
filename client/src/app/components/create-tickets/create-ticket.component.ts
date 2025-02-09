import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/ticket-api.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { DraftTicket, Status } from '../../types';
import { ItemForm } from '../../types';


@Component({
  selector: 'app-create-ticket',
  imports: [ReactiveFormsModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css'
})

export class CreateTicketComponent {
  apiService = inject(ApiService);
  fb = inject(NonNullableFormBuilder)

  form = this.fb.group<ItemForm>({
   title: this.fb.control('', {validators: [Validators.required]}),
   content: this.fb.control('', {validators: [Validators.required]}),
   status: this.fb.control(Status.PENDING , {validators: [Validators.required]})
  })

  submitForm(){
    const newForm: DraftTicket = {
      title: this.form.value.title!,
      content: this.form.value.content!,
      status: this.form.value.status!,
    }
    console.log(newForm)
    this.apiService.createTicket(newForm).subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }
  
}
