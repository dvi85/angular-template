import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {UsersService} from "../../feature/users/users.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
      private router: Router,
      private userService: UsersService
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.isAdmin().pipe(
        map(isAdmin => {
          if (!isAdmin) {
            this.router.navigate(['/', 'users', '403']);
          }
          return isAdmin;
        }),
    );
  }
}
