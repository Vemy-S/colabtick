import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../enviroments/enviroments';
import { userCompanies } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class GetCompaniesService {
  private http = inject(HttpClient)
  private readonly BASE_URL = enviroment.apiCompanies;

  getCompanies(): Observable<userCompanies[]>{
    return this.http.get<userCompanies[]>(this.BASE_URL, { withCredentials: true });
  }

}
