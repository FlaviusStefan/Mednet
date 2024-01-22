import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authDoctorGuard: CanActivateFn = (route, state) => {
  
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  return accountService.currentDoctor$.pipe(
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