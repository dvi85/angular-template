import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material/app.material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainModule} from "./main/main.module";

@NgModule({
  declarations: [
    AppComponent
  ],
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
  bootstrap: [AppComponent]
})
export class AppModule {}
