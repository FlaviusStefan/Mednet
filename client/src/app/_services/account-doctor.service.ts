import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Doctor } from '../_models/doctor';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountDoctorService {
  baseUrl = 'https://localhost:5003/api/';
  private currentDoctorSource = new BehaviorSubject<Doctor | null>(null);
  currentDoctor$ = this.currentDoctorSource.asObservable();

  constructor(private http: HttpClient) { }

  loginAsDoctor(model: any){
    return this.http.post<Doctor>(this.baseUrl + 'account/login', model).pipe(
      map((response: Doctor) => {
        const doctor = response;
        if (doctor) {
          localStorage.setItem('doctor', JSON.stringify(doctor));
          this.currentDoctorSource.next(doctor);
        }
      })
    )
  }

  registerAsDoctor(model: any){
    return this.http.post<Doctor>(this.baseUrl + 'account/register', model).pipe(
      map(doctor=> {
        if(doctor){
          localStorage.setItem('doctor',JSON.stringify(doctor));
          this.currentDoctorSource.next(doctor);
        }
      })
    )
  }

  setCurrentDoctor(doctor: Doctor) {
    this.currentDoctorSource.next(doctor);
  }

  logoutAsDoctor(){
    localStorage.removeItem('doctor');
    this.currentDoctorSource.next(null);
  }
}
