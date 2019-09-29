import { GrausInstrucaoComponent } from './graus-instrucao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrausInstrucaoRoutingModule } from './graus-instrucao-routing.module';
import { CadastrarGrausInstrucaoComponent } from './cadastrar-graus-instrucao/cadastrar-graus-instrucao.component';


@NgModule({
  declarations: [GrausInstrucaoComponent, CadastrarGrausInstrucaoComponent],
  imports: [
    CommonModule,
    GrausInstrucaoRoutingModule
  ]
})
export class GrausInstrucaoModule { }
