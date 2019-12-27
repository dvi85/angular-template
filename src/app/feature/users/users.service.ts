import {Injectable} from "@angular/core";
import {User} from "./components/store/user";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Pageable} from "./components/store/pageable";
import {URL_BLOCK_USER, URL_CURRENT_USER, URL_UNBLOCK_USER, URL_USERS} from "../../app.constants";
import {map, share} from "rxjs/operators";

export const ADMIN_ROLE = 'ADMIN';

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private currentUser$: Observable<User> = this.http.get<User>(URL_CURRENT_USER).pipe(share());

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

  getCurrentUser(): Observable<User> {
    return this.currentUser$;
  }

  isAdmin(): Observable<boolean> {
    return this.currentUser$.pipe(
        map(({roles}) => roles.some(role => role === ADMIN_ROLE))
    )
  }

  blockUser(user: User): Observable<any> {
    return  this.http.put(URL_BLOCK_USER(user.id), {});
  }

  unBlockUser(user: User): Observable<any> {
    return  this.http.put(URL_UNBLOCK_USER(user.id), {});
  }
}
