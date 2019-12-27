import {Injectable} from "@angular/core";
import {User} from "./components/store/user";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Pageable} from "./components/store/pageable";
import {AUTH_SERVER_URL, URL_BLOCK_USER, URL_UNBLOCK_USER, URL_USERS} from "../../app.constants";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  findUsers(filter = "", sortOrder = "asc", sortBy = '', pageNumber = 0, pageSize = 10): Observable<Pageable<User[]>> {
    return this.http
      .get<Pageable<User[]>>(URL_USERS, {
        params: new HttpParams()
          .set("filter", filter)
          .set("direction", sortOrder.toUpperCase())
          .set("sortBy", sortBy)
          .set("page", pageNumber.toString())
          .set("size", pageSize.toString())
      });
  }

  blockUser(user: User): Observable<any> {
    return  this.http.put(URL_BLOCK_USER(user.id), {});
  }

  unBlockUser(user: User): Observable<any> {
    return  this.http.put(URL_UNBLOCK_USER(user.id), {});
  }
}
