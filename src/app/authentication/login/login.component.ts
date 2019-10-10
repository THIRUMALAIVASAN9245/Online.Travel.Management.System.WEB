import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../providers/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  isErrorMessage: string = "";

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['thirumalai@test.com', Validators.required],
      password: ['test123', Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    this.isErrorMessage = "";
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const response = this.authService.login(this.loginForm.value);
    response.subscribe((response) => {
      this.authService.setToken(JSON.parse(response).token);
      this.authService.setUserId(this.loginForm.value.email);
      this.router.navigate(['/admin/user-details'])
    }, error => {
      this.isErrorMessage = error.message;
    });
  }
}