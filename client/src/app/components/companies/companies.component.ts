import { Component, inject, OnInit, Signal } from '@angular/core';
import { GetCompaniesService } from './services/get-companies.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { userCompanies } from '../../types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-companies',
  imports: [RouterLink, DatePipe],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent{
  private getCompaniesServices = inject(GetCompaniesService)

  signalCompanies: Signal<userCompanies[] | undefined > = toSignal(this.getCompaniesServices.getCompanies())

}
