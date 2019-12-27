import {ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {AuthService} from "../core/auth/auth.service";
import {User} from "../feature/users/components/store/user";

@Component({
  selector: 'app-container',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnDestroy {
    @Input() currentUser: User;
    mobileQuery: MediaQueryList;


    private _mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService:AuthService) {
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
