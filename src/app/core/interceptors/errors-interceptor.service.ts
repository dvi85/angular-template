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
import { PopupMessageComponent } from "../../shared/dialog/popup-message/popup-message.component";
import {MatDialog} from "@angular/material/dialog";
import {OpenPopupService} from "../../shared/dialog/open-popup.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private openPopupService: OpenPopupService,
  ) {}

  showError(dialogMessage: string) {
    this.openDialog(dialogMessage, 'Ошибка');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("ErrorInterceptor");
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("error.status", error.status);
        switch (error.status) {
          case 401 || 403:
            this.authService.logout();
            this.router.navigate(["/auth"]);
            this.showError(this.getErrorMessage(error));
            break;
          default:
              this.showError(this.getErrorMessage(error));
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
        return e.error  ? JSON.stringify(e.error) : JSON.stringify(e);
    }
}
