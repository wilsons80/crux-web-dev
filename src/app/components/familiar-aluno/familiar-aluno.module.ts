import { CadastrarFamiliarAlunoComponent } from './cadastrar-familiar-aluno/cadastrar-familiar-aluno.component';
import { FamiliarAlunoComponent } from './familiar-aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliarAlunoRoutingModule } from './familiar-aluno-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAlunoComponent } from './dados-aluno/dados-aluno.component';
import { PessoaFisicaModule } from '../common/pessoa-fisica/pessoa-fisica.module';


@NgModule({
  declarations: [FamiliarAlunoComponent, CadastrarFamiliarAlunoComponent, DadosAlunoComponent],
  imports: [
    CommonModule,
    FamiliarAlunoRoutingModule,
    MaterialCommonModule,
    PessoaFisicaModule
  ]
})
export class FamiliarAlunoModule { }
