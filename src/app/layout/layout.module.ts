import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppMaterialModule } from "../shared/material/app.material.module";
import { PopupMessageComponent } from "../shared/dialog/popup-message/popup-message.component";
import {LayoutComponent} from "./layout.component";

@NgModule({
  declarations: [LayoutComponent, PopupMessageComponent],
  imports: [CommonModule, AppMaterialModule],
  entryComponents: [PopupMessageComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
