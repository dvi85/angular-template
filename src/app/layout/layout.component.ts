import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {AuthService} from "../core/auth/auth.service";
import {UsersService} from "../feature/users/users.service";
import {Observable} from "rxjs";
import {pluck} from "rxjs/operators";

@Component({
  selector: 'app-container',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnDestroy {
    userName$: Observable<string> = this.userService.getCurrentUser().pipe(pluck('name'));
    mobileQuery: MediaQueryList;


    private _mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService:AuthService, private userService: UsersService) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    logout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
