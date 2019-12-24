import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContainerComponent } from "./container/container.component";
import { AppMaterialModule } from "../material/app.material.module";
import { PopupMessageComponent } from "../dialog/popup-message/popup-message.component";

@NgModule({
  declarations: [ContainerComponent, PopupMessageComponent],
  imports: [CommonModule, AppMaterialModule],
  entryComponents: [PopupMessageComponent],
  exports: [ContainerComponent]
})
export class MainModule {}
