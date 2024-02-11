import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AccountService } from '../_services/account.service';

export const authPatientGuard: CanActivateFn = (route, state) => {

  const accountPatientService = inject(AccountService);
  const toastr = inject(ToastrService);

  return accountPatientService.currentPatient$.pipe(
    map(patient => {
      if (patient) 
        return true;
      else {
        toastr.error('You are not allowed! This is PATIENT Area');
        return false;
      }
    })
  )
};
