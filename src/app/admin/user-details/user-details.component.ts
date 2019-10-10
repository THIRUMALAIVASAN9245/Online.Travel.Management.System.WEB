import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../providers/services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
  userDetails: any[];
  isErrorMessage: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  private getUserDetails() {
    this.isErrorMessage = "";
    const response = this.authService.getUser(null);
    response.subscribe((response) => {
      this.userDetails = response;
    }, error => {
      this.isErrorMessage = error.message;
    });
  }
}