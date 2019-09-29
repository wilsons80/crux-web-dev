import { ParticipanteAtendimentoComponent } from './participante-atendimento.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipanteAtendimentoRoutingModule } from './participante-atendimento-routing.module';
import { CadastrarParticipanteAtendimentoComponent } from './cadastrar-participante-atendimento/cadastrar-participante-atendimento.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [ParticipanteAtendimentoComponent, CadastrarParticipanteAtendimentoComponent],
  imports: [
    CommonModule,
    ParticipanteAtendimentoRoutingModule,
    MaterialCommonModule
  ]
})
export class ParticipanteAtendimentoModule { }
