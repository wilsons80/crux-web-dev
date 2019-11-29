import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OcorrenciaAlunoRoutingModule } from './ocorrencia-aluno-routing.module';
import { OcorrenciaAlunoComponent } from './ocorrencia-aluno.component';
import { CadastrarOcorrenciaAlunoComponent } from './cadastrar-ocorrencia-aluno/cadastrar-ocorrencia-aluno.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosFuncionarioModule } from '../common/dados-funcionario/dados-funcionario.module';
import { DadosAlunoModule } from '../common/dados-aluno/dados-aluno.module';


@NgModule({
  declarations: [OcorrenciaAlunoComponent, CadastrarOcorrenciaAlunoComponent],
  imports: [
    CommonModule,
    OcorrenciaAlunoRoutingModule,
    MaterialCommonModule,
    DadosFuncionarioModule,
    DadosAlunoModule
  ]
})
export class OcorrenciaAlunoModule { }
