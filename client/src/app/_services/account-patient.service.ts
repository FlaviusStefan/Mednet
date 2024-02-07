import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from '../_models/patient';

@Injectable({
  providedIn: 'root'
})
export class AccountPatientService {

  private currentPatientSource = new BehaviorSubject<Patient | null>(null);
  currentPatient$ = this.currentPatientSource.asObservable();

  constructor() { }
}
