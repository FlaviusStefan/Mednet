import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Doctor } from '../_models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctoraccountService {
  private currentDoctorSource = new BehaviorSubject<Doctor | null>(null);
  currentDoctor$ = this.currentDoctorSource.asObservable();

  constructor() { }
}
