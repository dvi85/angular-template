import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../store/user";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Store} from "@ngxs/store";
import {switchMap} from "rxjs/operators";
import {UsersDataService} from "../users.data.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

    constructor(private store: Store, private usersDataService: UsersDataService) {}

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    dataSource = new MatTableDataSource<User>();

    displayedColumns: string[] = ['id', 'login', 'name', 'surname'];


    ngOnInit() {
              this.store.select(state => state.users.search)
                  .pipe(switchMap(search => this.usersDataService.getUsersList(search)))
                  .subscribe(data => {
                      this.dataSource = new MatTableDataSource<User>(data);
                      this.dataSource.paginator = this.paginator;
                  });
    }

}
