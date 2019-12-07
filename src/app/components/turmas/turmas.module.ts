import { DadosFuncionarioModule } from './../common/dados-funcionario/dados-funcionario.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurmasRoutingModule } from './turmas-routing.module';
import { CadastrarTurmasComponent } from './cadastrar-turmas/cadastrar-turmas.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { TurmasComponent } from './turmas.component';
import { DadosTurmaComponent } from './dados-turma/dados-turma.component';
import { ColaboradoresTurmaComponent } from './colaboradores-turma/colaboradores-turma.component';
import { OficinaComponent } from './oficina/oficina.component';
import { CadastrarColaboradoresTurmaComponent } from './colaboradores-turma/cadastrar-colaboradores-turma/cadastrar-colaboradores-turma.component';
import { ListarColaboradoresTurmaComponent } from './colaboradores-turma/listar-colaboradores-turma/listar-colaboradores-turma.component';

@NgModule({
  declarations: [TurmasComponent, CadastrarTurmasComponent, DadosTurmaComponent, ColaboradoresTurmaComponent, OficinaComponent, CadastrarColaboradoresTurmaComponent, ListarColaboradoresTurmaComponent],
  imports: [
    CommonModule,
    TurmasRoutingModule,
    MaterialCommonModule,
    DadosFuncionarioModule
  ]
})
export class TurmasModule { }
