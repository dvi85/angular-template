import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponse, AuthService } from "../../core/auth/auth.service";
import { LoginModule } from "./login.module";

@Injectable({
  providedIn: "root"
})
export class AuthorisationResolver implements Resolve<any> {
  token: AuthResponse;

  constructor(private authService: AuthService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.token = {
      accessToken: route.queryParams.token,
      tokenType: "string"
    };
    this.authService.setToken(this.token);
    return undefined;
  }
}
