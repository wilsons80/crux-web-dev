import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrequenciaAlunoRoutingModule } from './frequencia-aluno-routing.module';
import { CadastrarFrequenciaAlunoComponent } from './cadastrar-frequencia-aluno/cadastrar-frequencia-aluno.component';
import { UniformeEntregueAlunoComponent } from './uniforme-entregue-aluno/uniforme-entregue-aluno.component';
import { CadastrarUniformeEntregueAlunoComponent } from './uniforme-entregue-aluno/cadastrar-uniforme-entregue-aluno/cadastrar-uniforme-entregue-aluno.component';


@NgModule({
  declarations: [CadastrarFrequenciaAlunoComponent, UniformeEntregueAlunoComponent, CadastrarUniformeEntregueAlunoComponent],
  imports: [
    CommonModule,
    FrequenciaAlunoRoutingModule
  ]
})
export class FrequenciaAlunoModule { }
