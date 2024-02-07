import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AccountDoctorService } from '../_services/account-doctor.service';

export const authDoctorGuard: CanActivateFn = (route, state) => {

  const accountDoctorService = inject(AccountDoctorService);
  const toastr = inject(ToastrService);

  return accountDoctorService.currentDoctor$.pipe(
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