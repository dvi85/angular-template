import {Component} from '@angular/core';
import {User} from "../store/user";
import {UsersDataService} from "../users.data.service";
import {Observable} from "rxjs";
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
    userList: Observable<User[]>;
    displayedColumns: string[] = ["id", "login", "name", "surname"];

    constructor(private usersDataService: UsersDataService) {
    }

    searchData({search}) {
        const searchStr = typeof search === 'string' ? search : '';
        this.userList = this.usersDataService.getUsersList(searchStr);
    }
}
