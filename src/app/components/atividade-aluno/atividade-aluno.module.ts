import { AtividadeAlunoComponent } from './atividade-aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtividadeAlunoRoutingModule } from './atividade-aluno-routing.module';
import { CadastrarAtividadeAlunoComponent } from './cadastrar-atividade-aluno/cadastrar-atividade-aluno.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [AtividadeAlunoComponent, CadastrarAtividadeAlunoComponent],
  imports: [
    CommonModule,
    AtividadeAlunoRoutingModule,
    MaterialCommonModule
  ]
})
export class AtividadeAlunoModule { }
