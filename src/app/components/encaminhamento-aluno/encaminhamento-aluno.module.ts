import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAlunoModule } from '../common/dados-aluno/dados-aluno.module';
import { CadastrarEncaminhamentoAlunoComponent } from './cadastrar-encaminhamento-aluno/cadastrar-encaminhamento-aluno.component';
import { DadosEntidadeSocialComponent } from './dados-entidade-social/dados-entidade-social.component';
import { EncaminhamentoAlunoRoutingModule } from './encaminhamento-aluno-routing.module';
import { EncaminhamentoAlunoComponent } from './encaminhamento-aluno.component';



@NgModule({
  declarations: [EncaminhamentoAlunoComponent, CadastrarEncaminhamentoAlunoComponent, DadosEntidadeSocialComponent],
  imports: [
    CommonModule,
    EncaminhamentoAlunoRoutingModule,
    MaterialCommonModule,
    DadosAlunoModule
  ]
})
export class EncaminhamentoAlunoModule { }
