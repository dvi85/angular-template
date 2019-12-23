import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppMaterialModule} from "../material/app.material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthComponent} from "./auth.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {
        path: 'login',
        component: AuthComponent
    }
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
      RouterModule.forChild(routes),
      CommonModule,
      AppMaterialModule,
      ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AuthModule {}
