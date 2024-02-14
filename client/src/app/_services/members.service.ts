import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../_models/patient';
import { Doctor } from '../_models/doctor';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient){}

  getPatients(){
    return this.http.get<Patient[]>(this.baseUrl + 'patients', this.getHttpOptions())
  }

  getPatient(username: string){
    return this.http.get<Patient>(this.baseUrl + 'patients/' + username, this.getHttpOptions())
  }

  getDoctors(){
    return this.http.get<Doctor[]>(this.baseUrl + 'doctors', this.getHttpOptions())
  }

  getDoctor(username: string){
    return this.http.get<Doctor>(this.baseUrl + 'doctors/' + username, this.getHttpOptions())
  }

  getHttpOptions(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    return{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token
      })
    }
  }
}
