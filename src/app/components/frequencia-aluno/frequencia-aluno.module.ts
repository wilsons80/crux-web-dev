import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrequenciaAlunoRoutingModule } from './frequencia-aluno-routing.module';
import { CadastrarFrequenciaAlunoComponent } from './cadastrar-frequencia-aluno/cadastrar-frequencia-aluno.component';


@NgModule({
  imports: [
    CommonModule,
    FrequenciaAlunoRoutingModule
  ]
})
export class FrequenciaAlunoModule { }
