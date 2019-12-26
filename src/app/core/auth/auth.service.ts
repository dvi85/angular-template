import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ACCESS_TOKEN, AUTH_URL} from "../../app.constants";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

export class AuthResponse {
    accessToken: string;
    tokenType: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient, private router: Router) {
    }

    get token(): string {
        if (this.jwtHelper.isTokenExpired(localStorage.getItem(ACCESS_TOKEN))) {
            this.logout();
            return null;
        }
        return  localStorage.getItem(ACCESS_TOKEN);
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(AUTH_URL, {email: username, password: password}).pipe(
            tap(response => this.setToken(response))
        );
    }

    logout() {
        this.setToken(null);
        this.router.navigate(['/', 'auth', 'login'])
    }

    isAuth(): boolean {
        console.log('isAuth');
        return !!this.token;
    }

    setToken(response: AuthResponse | null) {
        if (response) {
            console.log(this.jwtHelper.decodeToken(response.accessToken));
            console.log(this.jwtHelper.getTokenExpirationDate(response.accessToken));
            console.log(this.jwtHelper.isTokenExpired(response.accessToken));
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.router.navigate(['/', 'users', 'list']);
        } else {
            localStorage.clear();
            this.router.navigate(['/', 'auth', 'login'])
        }
    }
}
