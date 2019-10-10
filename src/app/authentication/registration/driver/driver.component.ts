import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MustMatch } from '../must-match.validator';
import { AuthService } from './../../../providers/services/auth.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html'
})
export class DriverComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string = "";

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['male', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      vehicleNumber: ['', [Validators.required]],
      license: ['', [Validators.required]],
      insurance: ['', [Validators.required]],
      permit: ['', [Validators.required]],
      registration: ['', [Validators.required]],
      description: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // vehicleImage: ['', [Validators.required]],
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.errorMessage = "";
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    const response = this.authService.register(this.registerForm.value);
    response.subscribe(result => {
      this.router.navigate(['/auth/login']);
    }, error => {
      this.errorMessage = error.message;
    });
  }
}

