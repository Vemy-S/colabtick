import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { AllCompanyService } from './services/all-company.service';
import { CompanyWithOutAccesKey, invitationData } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-company',
  imports: [DatePipe],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit{
  private allCompanyService = inject(AllCompanyService)
  private router = inject(ActivatedRoute)
  companyDetails = signal<CompanyWithOutAccesKey | undefined>(undefined)
  invitationReceived = signal<invitationData | undefined>(undefined)
  companyId = signal<string | undefined>(undefined)

  ngOnInit(): void {
   this.router.params.subscribe(param => {
    this.companyId.set(param['id'])
    this.fetchDetails(param['id'])
   })
  }

  generateLink() {  
    this.fetchLink(this.companyId()!)
  }

  private fetchLink(company_id: string){
    if(company_id){
      this.allCompanyService.getInvitationLink(company_id).subscribe(data => {
        this.invitationReceived.set(data)
      })
    }
  }

  private fetchDetails(company_id: string) {
    if(company_id){
      this.allCompanyService.getCompany(company_id).subscribe(data => {
        this.companyDetails.set(data)
      })
    }
  }

}
