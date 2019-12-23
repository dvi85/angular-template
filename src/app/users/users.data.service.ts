import { Injectable } from "@angular/core";
import { User } from "./store/user";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";

@Injectable({
  providedIn: "root"
})
export class UsersDataService {
  constructor() {}

  getUsersList(search: string): Observable<User[]> {
    return of(
        Array.from({ length: 256 }, (value, key) => key)
            .map(n => new User(n, n + "@gmail.com", "Name" + n, "Surname" + n))
            .filter(
                user =>
                    search === undefined ||
                    search === null ||
                    search == "" ||
                    user.login.includes(search) ||
                    user.name.includes(search) ||
                    user.surname.includes(search)
            )
    );
  }
}
