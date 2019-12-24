import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ACCESS_TOKEN, AUTH_URL, CLIENT_ID, CLIENT_SECRET, EXPIRES_IN, REFRESH_TOKEN} from "../app.constants";
import {Router} from "@angular/router";

export class AuthResponse {
    // tslint:disable-next-line:variable-name
    access_token: string;
    // tslint:disable-next-line:variable-name
    token_type: string;
    // tslint:disable-next-line:variable-name
    refresh_token: string;
    // tslint:disable-next-line:variable-name
    expires_in: number;
    scope: string;
    organization: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) {
    }

    get token(): string {
        let expDate
        if (localStorage.getItem(EXPIRES_IN )) {
            expDate = new Date(localStorage.getItem(EXPIRES_IN));
        }
        console.log('expDate EXPIRES_IN', expDate)
        if (!expDate || new Date() > expDate) {
            this.logout();
            return null;
        }
        return  localStorage.getItem(ACCESS_TOKEN);
    }

    login(username: string, password: string): Observable<any> {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('grant_type', 'password');

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
            }),
        };
        return this.http.post<any>(AUTH_URL, params.toString(), httpOptions).pipe(
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

    private setToken(response: AuthResponse | null) {
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expires_in * 1000);
            console.log('expDate tokean', expDate);
            localStorage.setItem(ACCESS_TOKEN, response.access_token);
            localStorage.setItem(REFRESH_TOKEN, response.refresh_token);
            localStorage.setItem(EXPIRES_IN, expDate.toString());
        } else {
            localStorage.clear();
        }
    }
}
