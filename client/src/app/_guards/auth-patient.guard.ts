import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authPatientGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  return accountService.currentPatient$.pipe(
    map(patient => {
      if (patient) 
        return true;
      else {
        toastr.error('You are not allowed!');
        return false;
      }
    })
  )
};
