import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

export const TokenName: string = "jwt_Token";
export const UserId: string = "userId";

import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  baseUrl: string = "http://localhost:51505/api/AuthService/";
  helper = new JwtHelperService();
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.loggedIn.next(this.getToken() != null);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getToken(): string {
    return localStorage.getItem(TokenName);
  }

  setToken(token: string): void {
    localStorage.setItem(TokenName, token);
  }

  setUserId(userId: string) {
    localStorage.setItem(UserId, userId);
  }

  getUserId() {
    return localStorage.getItem(UserId);
  }

  isTokenExpired() {
    return localStorage.getItem(UserId) ? false : true;
    // return this.helper.isTokenExpired(this.getToken());
  }

  getTokenExpirationDate() {
    return this.helper.getTokenExpirationDate(this.getToken());
  }

  deleteToken(): void {
    localStorage.removeItem(TokenName);
    localStorage.removeItem(UserId);
    this.loggedIn.next(false);
  }

  login(userDetails: any): Observable<any> {
    let url = `${this.baseUrl}` + "login";
    return this.http.post<any>(url, userDetails)
      .pipe(catchError(this.handleError('login')));
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, userData)
      .pipe(catchError(this.handleError('register')));
  }

  getUser(id: any): Observable<any> {
    let url = `${this.baseUrl}` + "1";
    return this.http.get<any>(url)
      .pipe(catchError(this.handleError('getUser')));
  }

  private handleError(operation: string) {
    return (error: any): Observable<any> => {
      debugger;
      console.error(error);
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'An server error occurred' + operation;
      let errObj = {
        title: errMsg,
        message: error.error
      };
      return throwError(errObj);
    };
  }
}