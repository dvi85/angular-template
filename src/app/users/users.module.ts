import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppMaterialModule} from "../material/app.material.module";
import {RouterModule, Routes} from "@angular/router";
import {UsersListComponent} from "./users-list/users-list.component";
import { SearchComponent } from './search/search.component';
import { GridComponent } from './grid/grid.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MainModule} from "../main/main.module";


const routes: Routes = [
    {
        path: 'list',
        component: UsersListComponent
    }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
      CommonModule,
      AppMaterialModule,
      ReactiveFormsModule,
      MainModule
  ],
    exports: [RouterModule],
    declarations: [UsersListComponent, SearchComponent, GridComponent]
})
export class UsersModule {}
