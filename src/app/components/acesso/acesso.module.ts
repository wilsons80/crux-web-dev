import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcessoRoutingModule } from './acesso-routing.module';
import { CadastrarAcessoComponent } from './cadastrar-acesso/cadastrar-acesso.component';
import { ConsultarAcessoComponent } from './consultar-acesso/consultar-acesso.component';
import { DeletarAcessoComponent } from './deletar-acesso/deletar-acesso.component';
import { AlterarAcessoComponent } from './alterar-acesso/alterar-acesso.component';


@NgModule({
  declarations: [ CadastrarAcessoComponent, ConsultarAcessoComponent, DeletarAcessoComponent, AlterarAcessoComponent],
  imports: [
    CommonModule,
    AcessoRoutingModule
  ]
})
export class AcessoModule { }
