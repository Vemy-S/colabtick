import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DraftCompany } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private http = inject(HttpClient)
  private readonly BASE_URL = 'http://localhost:3000/api/company'
  

  createCompany(company: DraftCompany): Observable<DraftCompany>{
    console.log('API', company)
    return this.http.post<DraftCompany>(`${this.BASE_URL}/create`, company, {
      withCredentials: true
    })
  }

}
