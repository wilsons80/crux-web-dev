import { AtividadeAlunoComponent } from './atividade-aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtividadeAlunoRoutingModule } from './atividade-aluno-routing.module';
import { CadastrarAtividadeAlunoComponent } from './cadastrar-atividade-aluno/cadastrar-atividade-aluno.component';


@NgModule({
  declarations: [AtividadeAlunoComponent, CadastrarAtividadeAlunoComponent],
  imports: [
    CommonModule,
    AtividadeAlunoRoutingModule
  ]
})
export class AtividadeAlunoModule { }
