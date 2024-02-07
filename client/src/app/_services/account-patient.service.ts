import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Patient } from '../_models/patient';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountPatientService {
  baseUrl = 'https://localhost:5003/api/';
  private currentPatientSource = new BehaviorSubject<Patient | null>(null);
  currentPatient$ = this.currentPatientSource.asObservable();

  constructor(private http: HttpClient) { }

  loginAsPatient(model: any){
    return this.http.post<Patient>(this.baseUrl + 'account/login', model).pipe(
      map((response: Patient) => {
        const patient = response;
        if (patient) {
          localStorage.setItem('patient', JSON.stringify(patient));
          this.currentPatientSource.next(patient);
        }
      })
    )
  }

  registerAsPatient(model: any){
    return this.http.post<Patient>(this.baseUrl + 'account/register', model).pipe(
      map(patient=> {
        if(patient){
          localStorage.setItem('patient',JSON.stringify(patient));
          this.currentPatientSource.next(patient);
        }
      })
    )
  }

  setCurrentPatient(patient: Patient) {
    this.currentPatientSource.next(patient);
  }

  logoutAsPatient(){
    localStorage.removeItem('patient');
    this.currentPatientSource.next(null);
  }
}
