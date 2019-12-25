import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
      private authService: AuthService,
      private router: Router) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('AuthInterceptor');
    if (this.authService.isAuth()) {
      console.log('isAuth == true');
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`
        }
      });
    }
    return next.handle(req);
  }
}
