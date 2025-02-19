import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyService } from './services/company.service';
import { DraftCompany } from '../../types';
import { ItemCompanyForm } from '../../types';


@Component({
  selector: 'app-create-company',
  imports: [ReactiveFormsModule],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {
  private fbCompany = inject(NonNullableFormBuilder)
  private companyService = inject(CompanyService)

  formCompany = this.fbCompany.group<ItemCompanyForm>({
    companyName: this.fbCompany.control('', { validators: [Validators.required] }),
    accesKey: this.fbCompany.control('', { validators: [Validators.required] })
  })

  //accesKey1 === accesKey2, validate... 

  submitForm(){
    const newCompany: DraftCompany = {
      company_name: this.formCompany.value.companyName!,
      acces_key: this.formCompany.value.accesKey!
    }

    console.log(newCompany)
    this.companyService.createCompany(newCompany).subscribe({
      next: (response) => {
        console.log(response)
      }
    })

  }
}
