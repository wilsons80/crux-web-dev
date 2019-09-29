import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsavelAlunoRoutingModule } from './responsavel-aluno-routing.module';
import { ResponsavelAlunoComponent } from './responsavel-aluno.component';
import { CadastrarResponsavelAlunoComponent } from './cadastrar-responsavel-aluno/cadastrar-responsavel-aluno.component';


@NgModule({
  declarations: [ResponsavelAlunoComponent, CadastrarResponsavelAlunoComponent],
  imports: [
    CommonModule,
    ResponsavelAlunoRoutingModule
  ]
})
export class ResponsavelAlunoModule { }
