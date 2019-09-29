import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcaoCompetenciaRoutingModule } from './acao-competencia-routing.module';
import { CadastrarAcaoCompetenciaComponent } from './cadastrar-acao-competencia/cadastrar-acao-competencia.component';
import { AcaoCompetenciaComponent } from './acao-competencia.component';


@NgModule({
  declarations: [AcaoCompetenciaComponent, CadastrarAcaoCompetenciaComponent],
  imports: [
    CommonModule,
    AcaoCompetenciaRoutingModule
  ]
})
export class AcaoCompetenciaModule { }
