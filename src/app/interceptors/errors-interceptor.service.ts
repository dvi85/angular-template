import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { PopupMessageComponent } from "../dialog/popup-message/popup-message.component";
import {MatDialog} from "@angular/material/dialog";
import {OpenPopupService} from "../dialog/open-popup.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private openPopupService: OpenPopupService,
  ) {}

  showError(dialogMessage: string, globalMessage) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("ErrorInterceptor");
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("error.status", error.status);
        switch (error.status) {
          // case 400:
          //   if (error.error && error.error.error === "invalid_grant") {
          //     this.showError("", "");
          //   }
          //   this.showError("", "");
          //   break;
          case 401 || 403:
            this.authService.logout();
            this.router.navigate(["/auth"]);
            this.showError("", "");
            break;
          default:
              this.openDialog(this.getErrorMessage(error), 'Ошибка');
            break;
        }
        return throwError(error);
      })
    );
  }

  openDialog(message: string, title?: string) {
    const config = { data: { message: message, title: title } };
    this.openPopupService.open(this.dialog, PopupMessageComponent, config);
  }

    getErrorMessage(e) {
        return e.error && e.error.errors ? e.error.errors[0] : JSON.stringify(e);
    }
}
