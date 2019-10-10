import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { AuthenticationRouting } from './authentication.routing';
import { AuthComponent } from './auth.component';

import { RegistrationComponent } from './registration/registration.component';
import { CustomerComponent } from './registration/customer/customer.component';
import { DriverComponent } from './registration/driver/driver.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AuthComponent,
    RegistrationComponent,
    CustomerComponent,
    DriverComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    AuthenticationRouting
  ],
  providers: [],
})
export class AuthenticationModule { }