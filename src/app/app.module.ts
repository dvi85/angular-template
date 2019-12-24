import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule, Provider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppMaterialModule } from "./material/app.material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainModule } from "./main/main.module";
import { AuthInterceptor } from "./interceptors/auth-interceptor.service";
import {AuthGuard} from "./auth/auth.guard";
import {ErrorInterceptor} from "./interceptors/errors-interceptor.service";

const AUTH_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

const ERROR_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: ErrorInterceptor
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MainModule
  ],
  providers: [AUTH_INTERCEPTOR, ERROR_INTERCEPTOR, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
