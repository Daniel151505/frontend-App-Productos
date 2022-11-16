import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from './loader.component';
import { Observable } from 'rxjs';

interface LoaderData {
  width?: string
}

@Injectable()
export class LoaderService {

  dialogRef: MatDialogRef<LoaderComponent> | undefined;

  constructor(private dialog: MatDialog) { }

  public show(data:LoaderData = {}): Observable<boolean> {
    this.dialogRef = this.dialog.open(LoaderComponent, { disableClose: true });
    this.dialogRef.updateSize(data.width);
    return this.dialogRef.afterClosed();
  }

  public hide() {
    if (this.dialogRef)
      this.dialogRef.close();
  }

}
