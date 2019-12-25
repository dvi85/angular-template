import { Injectable } from "@angular/core";
import { User } from "./store/user";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { map } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  findLessons(
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 3
  ): Observable<User[]> {
    return this.http
      .get("/api/users", {
        params: new HttpParams()
          .set("filter", filter)
          .set("sortOrder", sortOrder)
          .set("pageNumber", pageNumber.toString())
          .set("pageSize", pageSize.toString())
      })
      .pipe(map(res => res["payload"]));
  }
}
