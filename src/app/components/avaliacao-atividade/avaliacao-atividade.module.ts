import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvaliacaoAtividadeRoutingModule } from './avaliacao-atividade-routing.module';
import { AvaliacaoAtividadeComponent } from './avaliacao-atividade.component';
import { CadastrarAvaliacaoAtividadeComponent } from './cadastrar-avaliacao-atividade/cadastrar-avaliacao-atividade.component';


@NgModule({
  declarations: [AvaliacaoAtividadeComponent, CadastrarAvaliacaoAtividadeComponent],
  imports: [
    CommonModule,
    AvaliacaoAtividadeRoutingModule
  ]
})
export class AvaliacaoAtividadeModule { }
