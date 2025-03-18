import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/ticket-api.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { DraftTicket, Status } from '../../types';
import { ItemForm } from '../../types';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-ticket',
  imports: [ReactiveFormsModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css'
})

export class CreateTicketComponent implements OnInit {
  apiService = inject(ApiService);
  fb = inject(NonNullableFormBuilder)
  router = inject(ActivatedRoute)
  signalCompanyId = signal<string | undefined>(undefined)

  ngOnInit(): void {
    this.router.params.subscribe(params => {
        this.signalCompanyId.set(params["id"])
    })
  }

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

    console.log(typeof this.signalCompanyId())

    this.apiService.createTicket(newForm, this.signalCompanyId()!).subscribe({
      next: (response) => {
        console.log(response)
      }
    })  
     
  }
  
}
