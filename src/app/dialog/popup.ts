import { MatDialogRef } from '@angular/material';

export class Popup<T> {
  constructor(public dialogRef: MatDialogRef<T>) {}

  close(action?: any) {
    this.dialogRef.close(action);
  }
}
