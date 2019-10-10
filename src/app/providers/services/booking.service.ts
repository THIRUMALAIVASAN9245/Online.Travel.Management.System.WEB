import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { Booking } from '../models/booking.model';

@Injectable()
export class BookingService {

  baseUrl: string = "http://localhost:51380/api/BookingService/";

  constructor(private http: HttpClient) {
  }

  booking(bookingData: any): Observable<any> {
    var bodyData = JSON.stringify(bookingData);
    let url = `${this.baseUrl}` + "booking";
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    if (bookingData.pickupLocation === "admin" || bookingData.pickupLocation === "test") {
      return of("Validbooking");
    }
    let errObj = {
      title: "Invalidbooking",
      message: "An server error occurred"
    };
    return throwError(errObj);
    // return this.http.post(url, bodyData, httpOptions).pipe(map((response: Response) => {
    //   let body = response.json();
    //   var responseData = body || {};
    //   return responseData;
    // }), catchError(this.handleError('Register', null)));
  }

  getBookings(query: any): Observable<any> {
    var bodyData = JSON.stringify(query);
    let url = `${this.baseUrl}` + "booking";
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return of(this.getBooking());
    // return this.http.post(url, bodyData, httpOptions).pipe(map((response: Response) => {
    //   let body = response.json();
    //   var responseData = body || {};
    //   return responseData;
    // }), catchError(this.handleError('Register', null)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'An server error occurred';
      console.log(`${operation} failed: ${error.message}`);
      let body = error.json();
      let errObj = {
        title: errMsg,
        message: errMsg === "An server error occurred" ? errMsg : body
      };
      return of(error);
    };
  }

  private getBooking(): any {
    return [
      {
        driverName: "Scorpio Driver",
        customerName: "Thirumalai",
        pickupAddress: "Tadwadi, Surat, Gujarat, India",
        pickupDate: new Date("1990-02-02"),
        dropAddress: "Bharuch, Gujarat, India",
        dropDate: new Date("1990-02-02"),
        amount: "855",
        paymentStatus: "PAID",
        status: "COMPLETED"
      },
      {
        driverName: "Scorpio Driver",
        customerName: "Thirumalai",
        pickupAddress: "Thane, Maharashtra, India",
        pickupDate: new Date("1990-02-02"),
        dropAddress: "Bharuch, Gujarat, India",
        dropDate: new Date("1990-02-02"),
        amount: "527",
        paymentStatus: "",
        status: "CANCELLED"
      },
      {
        driverName: "Scorpio Driver",
        customerName: "Thirumalai",
        pickupAddress: "tTadwadi, Surat, Gujarat, India",
        pickupDate: new Date("1990-02-02"),
        dropAddress: "Delhi, India",
        dropDate: new Date("1990-02-02"),
        amount: "143",
        paymentStatus: "",
        status: "ACCEPTED"
      },
      {
        driverName: "Scorpio Driver",
        customerName: "Thirumalai",
        pickupAddress: "tTadwadi, Surat, Gujarat, India",
        pickupDate: new Date("1990-02-02"),
        dropAddress: "Delhi, India",
        dropDate: new Date("1990-02-02"),
        amount: "743",
        paymentStatus: "",
        status: "PENDING"
      },
      {
        driverName: "Scorpio Driver",
        customerName: "Thirumalai",
        pickupAddress: "tTadwadi, Surat, Gujarat, India",
        pickupDate: new Date("1990-02-02"),
        dropAddress: "Delhi, India",
        dropDate: new Date("1990-02-02"),
        amount: "262",
        paymentStatus: "PAID",
        status: "COMPLETED"
      }
    ]
  }
}