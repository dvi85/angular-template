import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.authService.isAuth());
    if (this.authService.isAuth()) {
       return true;
     } else {
       this.authService.logout();
       this.router.navigate(['/auth/login'], {
         queryParams: {
           sessionExpired: true
         }
       });
     }
  }

}
