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
import { CadastrarOficinasComponent } from './oficina/cadastrar-oficinas/cadastrar-oficinas.component';
import { ListarOficinasComponent } from './oficina/listar-oficinas/listar-oficinas.component';
import { DadosAtividadeComponent } from './oficina/dados-atividade/dados-atividade.component';
import { ColaboradoresAtividadeComponent } from './oficina/colaboradores-atividade/colaboradores-atividade.component';
import { MatExpansionModule, MatTabsModule } from '@angular/material';
import { CadastrarColaboradoresAtividadeComponent } from './oficina/colaboradores-atividade/cadastrar-colaboradores-atividade/cadastrar-colaboradores-atividade.component';
import { ListarColaboradoresAtividadeComponent } from './oficina/colaboradores-atividade/listar-colaboradores-atividade/listar-colaboradores-atividade.component';
import { MateriaisOficinaComponent } from './oficina/materiais-oficina/materiais-oficina.component';
import { CadastrarMateriaisComponent } from './oficina/materiais-oficina/cadastrar-materiais/cadastrar-materiais.component';
import { ListarMateriaisComponent } from './oficina/materiais-oficina/listar-materiais/listar-materiais.component';

@NgModule({
  declarations: [TurmasComponent, CadastrarTurmasComponent, 
                 DadosTurmaComponent, ColaboradoresTurmaComponent, 
                 OficinaComponent, 
                 CadastrarColaboradoresTurmaComponent, 
                 ListarColaboradoresTurmaComponent, 
                 CadastrarOficinasComponent, 
                 ListarOficinasComponent,
                 DadosAtividadeComponent,
                 ColaboradoresAtividadeComponent,
                 CadastrarColaboradoresAtividadeComponent,
                 ListarColaboradoresAtividadeComponent,
                 MateriaisOficinaComponent,
                 CadastrarMateriaisComponent,
                 ListarMateriaisComponent],
  imports: [
    CommonModule,
    TurmasRoutingModule,
    MaterialCommonModule,
    DadosFuncionarioModule,
    MatExpansionModule,
    MatTabsModule
  ]
})
export class TurmasModule { }
