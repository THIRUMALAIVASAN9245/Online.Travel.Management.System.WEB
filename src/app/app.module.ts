import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BsDatepickerModule, TimepickerModule, ModalModule } from 'ngx-bootstrap';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';

import { AuthenticationModule } from './authentication/authentication.module';
import { AdminModule } from './admin/admin.module';

import { AuthService } from './providers/services/auth.service';
import { BookingService } from './providers/services/booking.service';
import { AuthGuard } from './providers/services/auth-guard.service';
import { AuthInterceptor } from './providers/services/auth.Interceptor';

import { DashBoardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    AuthenticationModule,
    AdminModule,
    AppRouting
  ],
  providers: [
    AuthGuard,
    AuthService,
    BookingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }