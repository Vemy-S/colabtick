import { Component } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroments';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  googleLogin(){
    window.location.href = `${enviroment.apiAuthUrl}/google/login`
  }
  
}
