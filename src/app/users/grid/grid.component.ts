import { Component, Input, SimpleChange, ViewChild } from "@angular/core";
import { User } from "../store/user";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { UsersDataService } from "../users.data.service";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent {
  constructor(private usersDataService: UsersDataService) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() userList;

  dataSource = new MatTableDataSource<User>();

  displayedColumns: string[] = ["id", "login", "name", "surname"];

  ngOnChanges(changes: SimpleChange) {
    if (changes["userList"]) {
      this.userList.subscribe(data => {
        this.dataSource = new MatTableDataSource<User>(data);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
}
