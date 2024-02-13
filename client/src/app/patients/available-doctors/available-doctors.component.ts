import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/_models/doctor';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-available-doctors',
  templateUrl: './available-doctors.component.html',
  styleUrls: ['./available-doctors.component.css']
})
export class AvailableDoctorsComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private memberService: MembersService){}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(){
    this.memberService.getDoctors().subscribe({
      next: doctors => this.doctors = doctors
    })
  }
}