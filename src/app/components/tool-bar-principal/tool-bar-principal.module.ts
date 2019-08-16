import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarPrincipalComponent } from './tool-bar-principal.component';
import { MatToolbarModule, MatIconModule, MatMenuModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';



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
  ],
  exports: [ToolBarPrincipalComponent]
})
export class ToolBarPrincipalModule { }
