import { CadastrarFamiliarAlunoComponent } from './cadastrar-familiar-aluno/cadastrar-familiar-aluno.component';
import { FamiliarAlunoComponent } from './familiar-aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliarAlunoRoutingModule } from './familiar-aluno-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [FamiliarAlunoComponent, CadastrarFamiliarAlunoComponent],
  imports: [
    CommonModule,
    FamiliarAlunoRoutingModule,
    MaterialCommonModule
  ]
})
export class FamiliarAlunoModule { }
