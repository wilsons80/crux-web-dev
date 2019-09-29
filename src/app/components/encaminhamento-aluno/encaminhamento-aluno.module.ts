import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncaminhamentoAlunoRoutingModule } from './encaminhamento-aluno-routing.module';
import { EncaminhamentoAlunoComponent } from './encaminhamento-aluno.component';
import { CadastrarEncaminhamentoAlunoComponent } from './cadastrar-encaminhamento-aluno/cadastrar-encaminhamento-aluno.component';


@NgModule({
  declarations: [EncaminhamentoAlunoComponent, CadastrarEncaminhamentoAlunoComponent],
  imports: [
    CommonModule,
    EncaminhamentoAlunoRoutingModule
  ]
})
export class EncaminhamentoAlunoModule { }
