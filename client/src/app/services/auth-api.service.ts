import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private readonly BASE_URL = enviroment.apiAuthUrl;
  private http = inject(HttpClient)

}
