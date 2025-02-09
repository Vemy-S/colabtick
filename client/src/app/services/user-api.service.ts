import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  
  http = inject(HttpClient)
  private readonly BASE_URL = enviroment.apiUserUrl

  getUser(): Observable<any>{
    return this.http.get<any>(`${this.BASE_URL}`, {withCredentials: true})
  }
  
}
