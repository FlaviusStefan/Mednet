import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { AccountDoctor } from '../_models/accountdoctor';
import { AccountPatient } from '../_models/accountpatient';
import { Role } from '../_models/role';
import { environment } from 'src/environments/environment';
  
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl
  private currentPatientSource = new BehaviorSubject<AccountPatient | null>(null);
  private currentDoctorSource = new BehaviorSubject<AccountDoctor | null>(null);

  currentPatient$: Observable<AccountPatient | null>;
  currentDoctor$: Observable<AccountDoctor | null>;

  constructor(private http: HttpClient, private router: Router) 
  { 
    this.currentPatient$ = this.currentPatientSource.asObservable();
    this.currentDoctor$ = this.currentDoctorSource.asObservable();
  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          if(user.role === Role.Patient) {
            this.router.navigateByUrl("patients/menu");
            this.currentPatientSource.next(user);   
          } else if (user.role === Role.Doctor) {
            this.router.navigateByUrl("doctors/panel");
            this.currentDoctorSource.next(user as AccountDoctor);      
          }   
        }
      })
    )
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user=> {
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentPatientSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    if(user.role === Role.Patient) {
      this.currentPatientSource.next(user);
    }
    else if (user.role === Role.Doctor) {
      this.currentDoctorSource.next(user as AccountDoctor);     
    }
  }

  logout(){
    const user = localStorage.getItem('user');
    if(user){
      if (JSON.parse(user).role === Role.Patient) {
        localStorage.removeItem('user');
        this.currentPatientSource.next(null);
      } else if (JSON.parse(user).role === Role.Doctor) {
        localStorage.removeItem('user');
        this.currentDoctorSource.next(null);
      }     
    } 
    
  }

}