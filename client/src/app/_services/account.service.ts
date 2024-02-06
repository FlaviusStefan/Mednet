import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { Doctor } from '../_models/doctor';
import { Patient } from '../_models/patient';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5003/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  private currentDoctorSource = new BehaviorSubject<Doctor | null>(null);
  private currentPatientSource = new BehaviorSubject<Patient | null>(null);

  currentUser$ = this.currentUserSource.asObservable();
  currentDoctor$ = this.currentDoctorSource.asObservable();
  currentPatient$ = this.currentPatientSource.asObservable();


  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user=> {
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}