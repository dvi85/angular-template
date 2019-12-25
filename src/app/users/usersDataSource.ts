import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { User } from "./store/user";
import { BehaviorSubject, Observable, of } from "rxjs";
import { UsersService } from "./users.service";
import { catchError, finalize } from "rxjs/operators";

export class UsersDataSource implements DataSource<User> {
  private usersSubject = new BehaviorSubject<User[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private usersService: UsersService) {}

  loadLessons(
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);

    this.usersService
      .findLessons(filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(lessons => this.usersSubject.next(lessons));
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<User[] | ReadonlyArray<User>> {
    console.log("Connecting data source");
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.usersSubject.complete();
      this.loadingSubject.complete();
  }
}
