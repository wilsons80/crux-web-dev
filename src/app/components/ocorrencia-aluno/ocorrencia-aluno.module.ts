import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OcorrenciaAlunoRoutingModule } from './ocorrencia-aluno-routing.module';
import { OcorrenciaAlunoComponent } from './ocorrencia-aluno.component';
import { CadastrarOcorrenciaAlunoComponent } from './cadastrar-ocorrencia-aluno/cadastrar-ocorrencia-aluno.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [OcorrenciaAlunoComponent, CadastrarOcorrenciaAlunoComponent],
  imports: [
    CommonModule,
    OcorrenciaAlunoRoutingModule,
    MaterialCommonModule
  ]
})
export class OcorrenciaAlunoModule { }
