import { CadastrarAtendimentoComponent } from './cadastrar-atendimento/cadastrar-atendimento.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtendimentoRoutingModule } from './atendimento-routing.module';
import { AtendimentoComponent } from './atendimento.component';


@NgModule({
  declarations: [AtendimentoComponent, CadastrarAtendimentoComponent],
  imports: [
    CommonModule,
    AtendimentoRoutingModule
  ]
})
export class AtendimentoModule { }
