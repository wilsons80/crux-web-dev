import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { LoadingPopupComponent } from 'src/app/components/common/loading-popup/loading-popup.component';

const dialogConfig = new MatDialogConfig();

@Injectable({
  providedIn: 'root'
})
export class LoadingPopupService {

  dialogRef: MatDialogRef<any,any>;

  constructor(public dialog: MatDialog) {
  }

  mostrarDialog(): void {
   
      this.openDialog();
  }

  closeDialog() {
    if (this.dialogRef)
      this.dialogRef.close();
  }


  private openDialog(): void {
    dialogConfig.disableClose = true;
    this.dialogRef = this.dialog.open(LoadingPopupComponent, {
      disableClose: true,
      position: {
        top: '40%'
      },
      width: '10%',
    });
  }


}
