import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LearnmoreComponent } from './learnmore/learnmore.component';
import { MedicalFileComponent } from './patients/medical-file/medical-file.component';
import { AppointmentsComponent } from './patients/appointments/appointments.component';
import { MenuComponent } from './patients/menu/menu.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { PanelComponent } from './doctors/panel/panel.component';
import { MyCasesComponent } from './doctors/my-cases/my-cases.component';
import { AvailableDoctorsComponent } from './patients/available-doctors/available-doctors.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LearnmoreComponent,
    MedicalFileComponent,
    AppointmentsComponent,
    MenuComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    PanelComponent,
    MyCasesComponent,
    AvailableDoctorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
