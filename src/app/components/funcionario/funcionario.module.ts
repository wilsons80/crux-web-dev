import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';
import { CadastrarFuncionarioComponent } from './cadastrar-funcionario/cadastrar-funcionario.component';


@NgModule({
  declarations: [FuncionarioComponent, CadastroFuncionarioComponent, CadastrarFuncionarioComponent],
  imports: [
    CommonModule,
    FuncionarioRoutingModule
  ]
})
export class FuncionarioModule { }
