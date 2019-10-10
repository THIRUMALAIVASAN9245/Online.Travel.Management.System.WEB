import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

import { AuthGuard } from './../providers/services/auth-guard.service';

import { UserDetailsComponent } from './user-details/user-details.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { RideDetailsComponent } from './ride-details/ride-details.component';
import { CreateRideComponent } from './create-ride/create-ride.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: '/ride-details', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: "user-details", component: UserDetailsComponent, canActivate: [AuthGuard] },
      { path: "driver-details", component: DriverDetailsComponent, canActivate: [AuthGuard] },
      { path: "ride-details", component: RideDetailsComponent, canActivate: [AuthGuard] },
      { path: "create-ride", component: CreateRideComponent, canActivate: [AuthGuard] }
    ]
  }];

export const AdminRouting: ModuleWithProviders = RouterModule.forRoot(adminRoutes);