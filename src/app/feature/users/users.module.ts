import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppMaterialModule} from "../../shared/material/app.material.module";
import {RouterModule, Routes} from "@angular/router";
import {UsersListComponent} from "./pages/users-page/users-list.component";
import { SearchComponent } from './components/search/search.component';
import { GridComponent } from './components/grid/grid.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "../../core/auth/auth.guard";
import {LayoutModule} from "../../layout/layout.module";


const routes: Routes = [
    {
        path: 'list',
        canActivate: [AuthGuard],
        component: UsersListComponent
    }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
      CommonModule,
      AppMaterialModule,
      ReactiveFormsModule,
      LayoutModule
  ],
    exports: [RouterModule],
    declarations: [UsersListComponent, SearchComponent, GridComponent]
})
export class UsersModule {}
