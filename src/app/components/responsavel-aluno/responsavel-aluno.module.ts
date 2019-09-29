import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsavelAlunoRoutingModule } from './responsavel-aluno-routing.module';
import { ResponsavelAlunoComponent } from './responsavel-aluno.component';
import { CadastrarResponsavelAlunoComponent } from './cadastrar-responsavel-aluno/cadastrar-responsavel-aluno.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [ResponsavelAlunoComponent, CadastrarResponsavelAlunoComponent],
  imports: [
    CommonModule,
    ResponsavelAlunoRoutingModule,
    MaterialCommonModule
  ]
})
export class ResponsavelAlunoModule { }
