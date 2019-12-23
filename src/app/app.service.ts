import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Store} from "@ngxs/store";
import {AppLogoutSuccessAction} from "./store/app.actions";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    env = environment;

    constructor(private http: HttpClient, private store: Store) {}

    logout() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            }),
            withCredentials: true,
        };
        this.http.post(this.env.base + "/logout", null, httpOptions)
            .subscribe(result => this.store.dispatch(new AppLogoutSuccessAction()));
    }
}