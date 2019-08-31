import { ModuloPedagogicoComponent } from './modulo-pedagogico.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubMenusComponent } from '../../apagar-depois/sub-menus/sub-menus.component';
import { MatMenuModule, MatButtonModule, MatIconModule, MatExpansionModule, MatInputModule, MatDividerModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { UnidadeModule } from '../../unidade/unidade.module';



@NgModule({
  declarations: [ModuloPedagogicoComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    RouterModule,
    UnidadeModule
  ],
  exports: [ModuloPedagogicoComponent]
})
export class ModuloPedagogicoModule { }
