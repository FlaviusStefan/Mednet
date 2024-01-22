import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  model: any = {};
  
  
  constructor(public accountService: AccountService,
              private router: Router, 
              private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('user/menu')      
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  loginDoctor(){
    this.accountService.loginDoctor(this.model).subscribe({
      next: _ => this.router.navigateByUrl('doctor/menu')      
    })
  }

  logoutDoctor(){
    this.accountService.logoutDoctor();
    this.router.navigateByUrl('/');
  }

  onSubmit() {
    if (this.accountService.currentDoctor$) {
      this.loginDoctor();
    } else if (this.accountService.currentUser$){
      this.login();
    }
  }

}
