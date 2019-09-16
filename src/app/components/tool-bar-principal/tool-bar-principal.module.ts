import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarPrincipalComponent } from './tool-bar-principal.component';
import { MatToolbarModule, MatIconModule, MatMenuModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ToolBarPrincipalComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule
  
  ],
  exports: [ToolBarPrincipalComponent]
})
export class ToolBarPrincipalModule { }
