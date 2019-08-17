import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoRoutingModule } from './aluno-routing.module';
import { CadastrarAlunoComponent } from './cadastrar-aluno/cadastrar-aluno.component';


@NgModule({
  declarations: [CadastrarAlunoComponent],
  imports: [
    CommonModule,
    AlunoRoutingModule
  ]
})
export class AlunoModule { }
