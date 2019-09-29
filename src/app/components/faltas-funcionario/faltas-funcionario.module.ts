import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { CadastrarFaltasFuncionarioComponent } from './cadastrar-faltas-funcionario/cadastrar-faltas-funcionario.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaltasFuncionarioRoutingModule } from './faltas-funcionario-routing.module';
import { FaltasFuncionarioComponent } from './faltas-funcionario.component';



@NgModule({
  declarations: [FaltasFuncionarioComponent, CadastrarFaltasFuncionarioComponent],
  imports: [
    CommonModule,
    FaltasFuncionarioRoutingModule,
    MaterialCommonModule
  ]
})
export class FaltasFuncionarioModule { }
