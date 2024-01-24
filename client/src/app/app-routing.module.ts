 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MedicalFileComponent } from './patients/medical-file/medical-file.component';
import { AppointmentsComponent } from './patients/appointments/appointments.component';
import { MenuComponent } from './patients/menu/menu.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {path: 'menu', component: MenuComponent},
      {path: 'medicalfile', component: MedicalFileComponent},
      {path: 'appointments', component: AppointmentsComponent},
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
