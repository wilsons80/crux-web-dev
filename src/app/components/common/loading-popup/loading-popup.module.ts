import { LoadingPopupComponent } from './loading-popup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule, MatDialogModule, MatProgressBarModule, MatToolbarModule, MatTooltipModule } from '@angular/material';



@NgModule({
  declarations: [LoadingPopupComponent],
  entryComponents: [LoadingPopupComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ]
})
export class LoadingPopupModule { }
