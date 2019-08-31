import { ModuloAdministrativoComponent } from './modulo-administrativo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentoComponent } from '../../departamento/departamento.component';
import { UnidadeRoutingModule } from '../../unidade/unidade-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { SubMenuDepartamentoComponent } from './sub-menu-departamento/sub-menu-departamento.component';
import { DepartamentoModule } from '../../departamento/departamento.module';



@NgModule({
  declarations: [
    ModuloAdministrativoComponent,
    SubMenuDepartamentoComponent
    ],
  imports: [
    CommonModule,
    UnidadeRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    TextMaskModule,
    MatListModule,
    DepartamentoModule
  ],
  exports:[ModuloAdministrativoComponent]
})
export class ModuloAdministrativoModule { }
