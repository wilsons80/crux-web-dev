import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReprovacaoAlunoRoutingModule } from './reprovacao-aluno-routing.module';
import { ReprovacaoAlunoComponent } from './reprovacao-aluno.component';
import { CadastrarReprovacaoAlunoComponent } from './cadastrar-reprovacao-aluno/cadastrar-reprovacao-aluno.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [ReprovacaoAlunoComponent, CadastrarReprovacaoAlunoComponent],
  imports: [
    CommonModule,
    ReprovacaoAlunoRoutingModule,
    MaterialCommonModule
  ]
})
export class ReprovacaoAlunoModule { }
