import {Injectable} from "@angular/core";
import {User} from "./components/store/user";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Pageable} from "./components/store/pageable";
import {URL_USERS} from "../../app.constants";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  findUsers(filter = "", sortOrder = "asc", pageNumber = 0, pageSize = 10): Observable<Pageable<User[]>> {
    return this.http
      .get<Pageable<User[]>>(URL_USERS, {
        params: new HttpParams()
          .set("filter", filter)
          .set("direction", sortOrder.toUpperCase())
          .set("page", pageNumber.toString())
          .set("size", pageSize.toString())
      });
  }
}
