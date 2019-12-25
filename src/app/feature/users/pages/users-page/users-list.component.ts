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
  displayedColumns: string[] = ["id", "login", "name", "surname"];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild("input", { static: false }) input: ElementRef;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.dataSource = new UsersDataSource(this.usersService);

    this.dataSource.loadLessons("", "asc", 0, 10);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadLessonsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadLessonsPage()))
      .subscribe();
  }

  loadLessonsPage() {
    this.dataSource.loadLessons(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
