import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { Doctor } from './_models/doctor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Mednet';
  
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString)
      return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

  setCurrentDoctor(){
    const doctorString = localStorage.getItem('doctor');
    if(!doctorString)
      return;
    const doctor: Doctor = JSON.parse(doctorString);
    this.accountService.setCurrentDoctor(doctor);
  }

}
