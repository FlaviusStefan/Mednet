import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AccountPatientService } from '../_services/account-patient.service';

export const authPatientGuard: CanActivateFn = (route, state) => {

  const accountPatientService = inject(AccountPatientService);
  const toastr = inject(ToastrService);

  return accountPatientService.currentPatient$.pipe(
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
