import { Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyService } from './services/company.service';
import { DraftCompany } from '../../types';

interface ItemCompanyForm {
  companyName: FormControl<string>,
  companyAuthorId: FormControl<number>
  accesKey: FormControl<string>
}

@Component({
  selector: 'app-create-company',
  imports: [ReactiveFormsModule],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {
  private fbCompany = inject(NonNullableFormBuilder)
  private companyService = inject(CompanyService)

  //Get LocalStorage...
  fakeUserId = 0;

  formCompany = this.fbCompany.group<ItemCompanyForm>({
    companyName: this.fbCompany.control('', { validators: [Validators.required] }),
    companyAuthorId: this.fbCompany.control(this.fakeUserId , { validators: [Validators.required] }),
    accesKey: this.fbCompany.control('', { validators: [Validators.required] })
  })

  //accesKey1 === accesKey2, validate... 

  submitForm(){
    const newCompany: DraftCompany = {
      company_name: this.formCompany.value.companyName!,
      company_authorId: this.formCompany.value.companyAuthorId!,
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
