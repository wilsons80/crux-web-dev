import { AvaliacaoAlunoComponent } from './avaliacao-aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvaliacaoAlunoRoutingModule } from './avaliacao-aluno-routing.module';
import { CadastrarAvaliacaoAlunoComponent } from './cadastrar-avaliacao-aluno/cadastrar-avaliacao-aluno.component';


@NgModule({
  declarations: [AvaliacaoAlunoComponent, CadastrarAvaliacaoAlunoComponent],
  imports: [
    CommonModule,
    AvaliacaoAlunoRoutingModule
  ]
})
export class AvaliacaoAlunoModule { }
