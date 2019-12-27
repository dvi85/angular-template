import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { User } from "./components/store/user";
import { BehaviorSubject, Observable, of } from "rxjs";
import { UsersService } from "./users.service";
import { catchError, finalize } from "rxjs/operators";

export class UsersDataSource implements DataSource<User> {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private usersCountSubject = new BehaviorSubject<number>(0);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public usersCount$ = this.usersCountSubject.asObservable();

  constructor(private usersService: UsersService) {}

  findUsers(
    filter: string,
    sortDirection: string,
    sortBy: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);

    this.usersService
      .findUsers(filter, sortDirection, sortBy, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(users => {
        this.usersSubject.next(users['content']);
        this.usersCountSubject.next(users['totalElements']);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<User[] | ReadonlyArray<User>> {
    console.log("Connecting data source");
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.usersSubject.complete();
      this.loadingSubject.complete();
  }
}
