import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPrincipalComponent } from './menu-principal.component';
import { MatMenuModule, MatButtonModule, MatIconModule, MatExpansionModule, MatExpansionPanel, MatFormFieldModule, MatInputModule, MatRippleModule, MatDividerModule } from '@angular/material';



@NgModule({
  declarations: [MenuPrincipalComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule
    
  ]
})
export class MenuPrincipalModule { }
