import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../enviroments/enviroments';
import { CompanyWithOutAccesKey } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class AllCompanyService {
  private http = inject(HttpClient)
  private readonly BASE_URL = enviroment.companyInvitation

  getCompany(): Observable<CompanyWithOutAccesKey>{
    return this.http.get<CompanyWithOutAccesKey>(this.BASE_URL)
  }

}
