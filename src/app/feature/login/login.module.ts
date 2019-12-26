import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppMaterialModule} from "../../shared/material/app.material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthorisationResolver} from "./authorisation.resolver";

const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'authorisation', resolve: {AuthorisationResolver}
    }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
      RouterModule.forChild(routes),
      CommonModule,
      AppMaterialModule,
      ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class LoginModule {}
