import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrequenciaAlunoRoutingModule } from './frequencia-aluno-routing.module';
import { CadastrarFrequenciaAlunoComponent } from './cadastrar-frequencia-aluno/cadastrar-frequencia-aluno.component';
import { FrequenciaAlunoComponent } from './frequencia-aluno.component';


@NgModule({
  declarations: [FrequenciaAlunoComponent, CadastrarFrequenciaAlunoComponent],
  imports: [
    CommonModule,
    FrequenciaAlunoRoutingModule
  ]
})
export class FrequenciaAlunoModule { }
