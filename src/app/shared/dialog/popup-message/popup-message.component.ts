import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Popup} from "../popup";

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupMessageComponent extends Popup<PopupMessageComponent> {
  constructor(
    public dialogRef: MatDialogRef<PopupMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) {
    super(dialogRef);
  }
}
