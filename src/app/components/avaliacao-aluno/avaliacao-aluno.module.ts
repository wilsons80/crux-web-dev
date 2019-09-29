import { AvaliacaoAlunoComponent } from './avaliacao-aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvaliacaoAlunoRoutingModule } from './avaliacao-aluno-routing.module';
import { CadastrarAvaliacaoAlunoComponent } from './cadastrar-avaliacao-aluno/cadastrar-avaliacao-aluno.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [AvaliacaoAlunoComponent, CadastrarAvaliacaoAlunoComponent],
  imports: [
    CommonModule,
    AvaliacaoAlunoRoutingModule,
    MaterialCommonModule
  ]
})
export class AvaliacaoAlunoModule { }
