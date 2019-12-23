import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Credentials} from "./store/credentials";
import {Observable, of} from "rxjs/index";
import {map, switchMap} from 'rxjs/operators';
import {AppUser} from "../store/app.user";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    env = environment;

    constructor(private http: HttpClient) {}

    login(credentials: Credentials): Observable<AppUser> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Basic ' + btoa(`${credentials.login}:${credentials.password}`),
            }),
            withCredentials: true,
        };
        return this.http.post(this.env.base + "/login", null, httpOptions)
            .pipe(switchMap(_ => this.http.get(this.env.base + "/appuser.json", {withCredentials: true})),
                map(data => data as AppUser)
            );
    }
}