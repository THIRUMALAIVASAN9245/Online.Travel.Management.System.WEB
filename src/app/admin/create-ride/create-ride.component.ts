import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BookingService } from './../../providers/services/booking.service';
import { AuthService } from './../../providers/services/auth.service';

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.component.html'
})
export class CreateRideComponent implements OnInit {
  mytime: Date = new Date();
  registerForm: FormGroup;
  driverDetails: any[];
  submitted = false;
  isErrorMessage: string = "";
  isBookDetail = false;
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm'
  };
  constructor(private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      pickupLocation: ['', [Validators.required]],
      dropLocation: ['', [Validators.required]],
      pickupDate: ['', [Validators.required]],
      pickupTime: ['', [Validators.required]],
      amount: ['123', []],
      customerId: ['12345', []],
      employeeId: ['12345', []]
    });
    this.getUserDetails();
  }

  openModal(template: TemplateRef<any>) {
    this.isErrorMessage = "";
    this.config.class = "modal-sm";
    this.modalRef = this.modalService.show(template, this.config);
  }
  openModal2(template: TemplateRef<any>) {
    this.config.class = "second";
    this.isErrorMessage = "";
    const response = this.bookingService.booking(this.registerForm.value);
    response.subscribe((response) => {
      this.modalRef2 = this.modalService.show(template, this.config);
    }, error => {
      this.isErrorMessage = error.message;
    }
    );
  }

  closeFirstModal() {
    this.isErrorMessage = "";
    if (!this.modalRef) {
      this.router.navigate(['/admin/ride-details']);
      return;
    }

    this.modalRef.hide();
    this.modalRef = null;
  }

  closeFirstModalNavigate() {
    this.router.navigate(['/admin/ride-details']);
    this.modalRef2.hide();
    this.modalRef.hide();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.isErrorMessage = "";
    this.submitted = true;
    this.isBookDetail = false;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.isBookDetail = true;
    console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
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