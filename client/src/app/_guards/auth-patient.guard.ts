import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { PatientaccountService } from '../_services/patientaccount.service';

export const authPatientGuard: CanActivateFn = (route, state) => {

  const patientAccountService = inject(PatientaccountService);
  const toastr = inject(ToastrService);

  return patientAccountService.currentPatient$.pipe(
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
