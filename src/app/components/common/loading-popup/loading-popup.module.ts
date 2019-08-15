import { LoadingPopupComponent } from './loading-popup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule, MatDialogModule, MatProgressBarModule, MatToolbarModule, MatTooltipModule } from '@angular/material';



@NgModule({
  declarations: [LoadingPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    
  ]
})
export class LoadingPopupModule { }
