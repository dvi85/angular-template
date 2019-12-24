import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ComponentType } from '@angular/cdk/overlay/index';
import { DialogConfig } from './dialog-config';
import {PopupMessageComponent} from "./popup-message/popup-message.component";

@Injectable({
  providedIn: 'root'
})
export class OpenPopupService {
  constructor(private dialog: MatDialog) {}

  open<T>(
    dialog: MatDialog,
    component: ComponentType<T>,
    config?: MatDialogConfig<any>,
  ): MatDialogRef<T> {
    const dialogConfig = { ...DialogConfig, ...config };
    return dialog.open(component, dialogConfig);
  }

  openMessagePopup(message: string, title?: string, buttonName?: string) {
    this.dialog.closeAll();
    return this.open(this.dialog, PopupMessageComponent, {
      data: { message, title, buttonName },
    });
  }
}
