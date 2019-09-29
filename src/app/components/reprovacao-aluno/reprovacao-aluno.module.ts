import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReprovacaoAlunoRoutingModule } from './reprovacao-aluno-routing.module';
import { ReprovacaoAlunoComponent } from './reprovacao-aluno.component';
import { CadastrarReprovacaoAlunoComponent } from './cadastrar-reprovacao-aluno/cadastrar-reprovacao-aluno.component';


@NgModule({
  declarations: [ReprovacaoAlunoComponent, CadastrarReprovacaoAlunoComponent],
  imports: [
    CommonModule,
    ReprovacaoAlunoRoutingModule
  ]
})
export class ReprovacaoAlunoModule { }
