import { CadastrarFamiliarAlunoComponent } from './cadastrar-familiar-aluno/cadastrar-familiar-aluno.component';
import { FamiliarAlunoComponent } from './familiar-aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliarAlunoRoutingModule } from './familiar-aluno-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosAlunoComponent } from './dados-aluno/dados-aluno.component';
import { PessoaFisicaModule } from '../common/pessoa-fisica/pessoa-fisica.module';
import { FamiliaresComponent } from './familiares/familiares.component';
import { EscolhaFamiliarComponent } from './escolha-familiar/escolha-familiar.component';
import { ParentescoComponent } from './parentesco/parentesco.component';
import { ProfissionalComponent } from './profissional/profissional.component';
import { NgxCurrencyModule } from 'ngx-currency';


@NgModule({
  declarations: [FamiliarAlunoComponent,
                 CadastrarFamiliarAlunoComponent,
                 DadosAlunoComponent,
                 FamiliaresComponent,
                 EscolhaFamiliarComponent, ParentescoComponent, ProfissionalComponent],
  imports: [
    CommonModule,
    FamiliarAlunoRoutingModule,
    MaterialCommonModule,
    PessoaFisicaModule,
    NgxCurrencyModule
  ]
})
export class FamiliarAlunoModule { }
