import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class GetCompaniesService {
  private http = inject(HttpClient)
  private readonly BASE_URL = enviroment.apiCompany;

  getCompanies(): Observable<any>{
    return this.http.get(this.BASE_URL, { withCredentials: true });
  }
}
