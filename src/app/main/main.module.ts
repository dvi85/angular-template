import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import {AppMaterialModule} from "../material/app.material.module";

@NgModule({
  declarations: [ContainerComponent],
  imports: [
      CommonModule,
      AppMaterialModule
  ],
  exports: [ContainerComponent]
})
export class MainModule { }
