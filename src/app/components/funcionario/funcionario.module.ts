import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { CadastrarFuncionarioComponent } from './cadastrar-funcionario/cadastrar-funcionario.component';
import { PessoaFisicaModule } from '../common/pessoa-fisica/pessoa-fisica.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DependentesComponent } from './dependentes/dependentes.component';
import { AlocacaoComponent } from './alocacao/alocacao.component';
import { ListarAlocacaoComponent } from './alocacao/listar-alocacao/listar-alocacao.component';
import { CadastrarAlocacaoComponent } from './alocacao/cadastrar-alocacao/cadastrar-alocacao.component';
import { NgxCurrencyModule } from 'ngx-currency';


@NgModule({
  declarations: [FuncionarioComponent, CadastrarFuncionarioComponent, DependentesComponent, AlocacaoComponent, ListarAlocacaoComponent, CadastrarAlocacaoComponent],
  imports: [
    CommonModule,
    NgxCurrencyModule,
    FuncionarioRoutingModule,
    PessoaFisicaModule,
    MaterialCommonModule,
  ]
})
export class FuncionarioModule { }
