import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  buttonText: string;

  constructor(private router: Router) {
    this.buttonText = this.router.url.includes('login') ? 'Register' : 'Login';
  }
  ngOnInit() {

  }

  changeText(): void {
    if (this.buttonText === 'Register') {
      this.buttonText = 'Login'
      this.router.navigate(['/auth/registration/customer']);
    } else {
      this.buttonText = 'Register'
      this.router.navigate(['/auth/login']);
    }
  }
}
