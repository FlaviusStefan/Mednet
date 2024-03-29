 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MedicalFileComponent } from './patients/medical-file/medical-file.component';
import { AppointmentsComponent } from './patients/appointments/appointments.component';
import { MenuComponent } from './patients/menu/menu.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { authDoctorGuard } from './_guards/auth-doctor.guard';
import { PanelComponent } from './doctors/panel/panel.component';
import { MyCasesComponent } from './doctors/my-cases/my-cases.component';
import { authPatientGuard } from './_guards/auth-patient.guard';
import { AvailableDoctorsComponent } from './patients/available-doctors/available-doctors.component';
import { LaboratoryReportsComponent } from './patients/laboratory-reports/laboratory-reports.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'patients',
    runGuardsAndResolvers: 'always',
    canActivate: [authPatientGuard],
    children: [
      {path: 'menu', component: MenuComponent},
      {path: 'medicalfile', component: MedicalFileComponent},
      {path: 'appointments', component: AppointmentsComponent},
      {path: 'laboratory-results', component: LaboratoryReportsComponent},
      {path: 'available-doctors', component: AvailableDoctorsComponent},
    ]
  },
  {path: 'doctors',
    runGuardsAndResolvers: 'always',
    canActivate: [authDoctorGuard],
    children: [
      {path: 'panel', component: PanelComponent},
      {path: 'my-cases', component: MyCasesComponent},
    ]
  },
  {path: 'errors', component: TestErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
