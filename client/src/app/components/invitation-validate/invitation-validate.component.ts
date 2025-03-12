import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllCompanyService } from '../company/services/all-company.service';

@Component({
  selector: 'app-invitation-validate',
  imports: [],
  templateUrl: './invitation-validate.component.html',
  styleUrl: './invitation-validate.component.css'
})
export class InvitationValidateComponent implements OnInit {
  private router = inject(ActivatedRoute)
  private companyService = inject(AllCompanyService)

  private uuid!: string;
  private token!: string;
  response!: string;
  
  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      console.log(params)
      this.uuid = params['uuid']
      this.token = params['token']
      if(this.token && this.uuid){
        console.log(`token: ${this.token}, uuid:${this.uuid}`)
        this.fetchValidateLink(this.token, this.uuid)
      }
    })
  }

  private fetchValidateLink(token: string, uuid: string){
    this.companyService.getValidateLink(token, uuid).subscribe(data => {
      this.response = data;
    })
  }
}
