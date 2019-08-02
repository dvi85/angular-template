import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
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
        return this.http.post(this.env.auth, credentials, {withCredentials: true})
            .pipe(
                map(data => data as AppUser)
            );
    }

}
