import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  logoName = 'ColabTicket'
  userActive = {
    email: '',
    displayName: ''
  }

  userApiService = inject(UserApiService)

  ngOnInit(): void {
    this.userApiService.getUser().subscribe({
      next: (data: any) => {
        this.userActive.email = data.email;
      }
    })
  }


}
