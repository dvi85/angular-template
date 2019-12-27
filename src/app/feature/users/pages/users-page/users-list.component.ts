import { Component, ElementRef, ViewChild } from "@angular/core";
import { User } from "../../components/store/user";
import { UsersService } from "../../users.service";
import { fromEvent, merge, Observable } from "rxjs";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { UsersDataSource } from "../../usersDataSource";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"]
})
export class UsersListComponent {
  userList: Observable<User[]>;
  dataSource: UsersDataSource;
  displayedColumns: string[] = ["id", "email", "name", "status", "roles", "action"];



  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild("input", { static: false }) input: ElementRef;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.dataSource = new UsersDataSource(this.usersService);

    this.dataSource.findUsers("", "asc", '', 0, 10);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadUsers();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadUsers()))
      .subscribe();
  }

  loadUsers() {
    this.dataSource.findUsers(
      this.input.nativeElement.value,
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  blockUser(user: User) {
    this.usersService.blockUser(user).subscribe(() => this.loadUsers());
  }

  unBlockUser(user: User) {
    this.usersService.unBlockUser(user).subscribe(() => this.loadUsers());
  }
}
