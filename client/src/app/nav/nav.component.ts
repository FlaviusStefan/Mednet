import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountDoctorService } from '../_services/account-doctor.service';
import { AccountPatientService } from '../_services/account-patient.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  model: any = {};
  
  
  constructor(public accountService: AccountService,
              public accountDoctorService: AccountDoctorService,
              public accountPatientService: AccountPatientService,
              private router: Router, 
              private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  // login(){
  //   this.accountService.login(this.model).subscribe({
  //     next: _ => this.router.navigateByUrl('user/menu')      
  //   })
  // }

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.accountDoctorService.currentDoctor$.subscribe(doctor => {
          if (doctor) {
            this.router.navigateByUrl('doctor/menu');
          } else {
            this.accountPatientService.currentPatient$.subscribe(patient => {
              if (patient) {
                this.router.navigateByUrl('patient/menu');
              } 
            });
          }
        });
      }
    });
  }
  
 
  loginAsDoctor(){
    this.accountDoctorService.loginAsDoctor(this.model).subscribe({
      next: _ => this.router.navigateByUrl('doctor/menu')      
    })
  }

  loginAsPatient(){
    this.accountPatientService.loginAsPatient(this.model).subscribe({
      next: _ => this.router.navigateByUrl('patient/menu')      
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  logoutAsDoctor(){
    this.accountDoctorService.logoutAsDoctor();
    this.router.navigateByUrl('/');
  }

  logoutAsPatient(){
    this.accountPatientService.logoutAsPatient();
    this.router.navigateByUrl('/');
  }

}
