import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncaminhamentoAlunoRoutingModule } from './encaminhamento-aluno-routing.module';
import { EncaminhamentoAlunoComponent } from './encaminhamento-aluno.component';
import { CadastrarEncaminhamentoAlunoComponent } from './cadastrar-encaminhamento-aluno/cadastrar-encaminhamento-aluno.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAlunoComponent } from './dados-aluno/dados-aluno.component';
import { DadosEntidadeSocialComponent } from './dados-entidade-social/dados-entidade-social.component';


@NgModule({
  declarations: [EncaminhamentoAlunoComponent, CadastrarEncaminhamentoAlunoComponent, DadosAlunoComponent, DadosEntidadeSocialComponent],
  imports: [
    CommonModule,
    EncaminhamentoAlunoRoutingModule,
    MaterialCommonModule
  ]
})
export class EncaminhamentoAlunoModule { }
