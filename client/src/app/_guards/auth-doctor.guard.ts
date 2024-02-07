import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { DoctoraccountService } from '../_services/doctoraccount.service';

export const authDoctorGuard: CanActivateFn = (route, state) => {

  const doctorAccountService = inject(DoctoraccountService);
  const toastr = inject(ToastrService);

  return doctorAccountService.currentDoctor$.pipe(
    map(doctor => {
      if (doctor) 
        return true;
      else {
        toastr.error('You are not allowed!');
        return false;
      }
    })
  )
};