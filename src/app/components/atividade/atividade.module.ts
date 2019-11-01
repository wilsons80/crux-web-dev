import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule, MatTabsModule } from '@angular/material';
import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { AtividadeRoutingModule } from './atividade-routing.module';
import { AtividadeComponent } from './atividade.component';
import { CadastrarAtividadeComponent } from './cadastrar-atividade/cadastrar-atividade.component';
import { ColaboradoresAtividadeComponent } from './cadastrar-atividade/colaboradores-atividade/colaboradores-atividade.component';
import { DadosAtividadeComponent } from './cadastrar-atividade/dados-atividade/dados-atividade.component';
import { CadastrarColaboradoresAtividadeComponent } from './cadastrar-atividade/colaboradores-atividade/cadastrar-colaboradores-atividade/cadastrar-colaboradores-atividade.component';
import { DadosFuncionarioModule } from '../common/dados-funcionario/dados-funcionario.module';
import { ListarColaboradoresAtividadeComponent } from './cadastrar-atividade/colaboradores-atividade/listar-colaboradores-atividade/listar-colaboradores-atividade.component';



@NgModule({
  declarations: [AtividadeComponent, CadastrarAtividadeComponent, DadosAtividadeComponent, ColaboradoresAtividadeComponent, CadastrarColaboradoresAtividadeComponent, ListarColaboradoresAtividadeComponent],
  imports: [
    CommonModule,
    AtividadeRoutingModule,
    MaterialCommonModule,
    MatExpansionModule,
    DadosFuncionarioModule,
    MatTabsModule
  ]
})
export class AtividadeModule { }
