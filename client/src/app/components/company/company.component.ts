import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { AllCompanyService } from './services/all-company.service';
import { CompanyWithOutAccesKey } from '../../types';
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

  ngOnInit(): void {
   this.router.params.subscribe(param => {
    this.fetchDetails(param['id'])
   })
  }

  private fetchDetails(id: string) {
    if(id){
      this.allCompanyService.getCompany(id).subscribe(data => {
        this.companyDetails.set(data)
      })
    }
  }

}
