import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { CustomerComponent } from './registration/customer/customer.component';
import { DriverComponent } from './registration/driver/driver.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "registration",
        component: RegistrationComponent,
        children: [
          { path: '', redirectTo: '/customer', pathMatch: 'full' },
          { path: "customer", component: CustomerComponent },
          { path: "employee", component: DriverComponent }
        ]
      }
    ]
  }
];

export const AuthenticationRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);