import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../providers/services/auth.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html'
})
export class DriverDetailsComponent implements OnInit {
  driverDetails: any[];
  isErrorMessage: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  private getUserDetails() {
    this.isErrorMessage = "";
    const response = this.authService.getUser(null);
    response.subscribe((response) => {
      this.driverDetails = response;
    }, error => {
      this.isErrorMessage = error.message;
    });
  }
}