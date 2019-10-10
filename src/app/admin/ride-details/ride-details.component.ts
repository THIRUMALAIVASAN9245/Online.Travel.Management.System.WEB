import { Component, OnInit } from '@angular/core';
import { BookingService } from './../../providers/services/booking.service';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html'
})
export class RideDetailsComponent implements OnInit {
  rideDetails: any[];
  isErrorMessage: string = "";

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.getBookingDetails();
  }

  private getBookingDetails() {
    this.isErrorMessage = "";
    const response = this.bookingService.getBookings(null);
    response.subscribe((response) => {
      this.rideDetails = response;
    }, error => {
      this.isErrorMessage = error.message;
    });
  }
}