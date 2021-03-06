import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        // // let headers = request.headers.set('Content-Type', 'application/json');
        let headers = request.headers.set('Authorization', `Bearer ${this.auth.getToken()}`).set('userId', this.auth.getUserId());
        
        request = request.clone({
            headers: headers
        });
        return next.handle(request);
    }
}