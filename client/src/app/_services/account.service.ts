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

  loginDoctor(model: any){
    return this.http.post<Doctor>(this.baseUrl + 'account/logindoctor', model).pipe(
      map((response: Doctor) => {
        const doctor = response;
        if (doctor) {
          localStorage.setItem('doctor', JSON.stringify(doctor));
          this.currentDoctorSource.next(doctor);
        }
      })
    )
  }

  loginPatient(model: any){
    return this.http.post<Patient>(this.baseUrl + 'account/loginpatient', model).pipe(
      map((response: Patient) => {
        const patient = response;
        if (patient) {
          localStorage.setItem('user', JSON.stringify(patient));
          this.currentPatientSource.next(patient);
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

  setCurrentDoctor(doctor: Doctor) {
    this.currentDoctorSource.next(doctor);
  }

  setCurrentPatient(patient: Patient) {
    this.currentPatientSource.next(patient);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  logoutDoctor(){
    localStorage.removeItem('doctor');
    this.currentDoctorSource.next(null);
  }

  logoutPatient(){
    localStorage.removeItem('patient');
    this.currentPatientSource.next(null);
  }

}