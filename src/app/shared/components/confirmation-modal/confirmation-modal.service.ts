import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationModalComponent } from './confirmation-modal.component';

interface ConfirmData {
  title?: string,
  message?: string,
  cancel?: boolean
}


@Injectable()
export class ConfirmationModalService {

  dialogRef!: MatDialogRef<ConfirmationModalComponent>;

  constructor(private dialog: MatDialog) { }

  public confirmation(data: ConfirmData = {}): Observable<boolean> {
    data.title = data.title;
    data.message = data.message;
    data.cancel = data.cancel;

    this.dialogRef = this.dialog.open(ConfirmationModalComponent, {
      disableClose: true,
      data: { title: data.title, message: data.message, ocultarCerrar: data.cancel }
    });
    return this.dialogRef.afterClosed();
  }

}
