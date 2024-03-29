import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxCurrencyModule } from 'ngx-currency';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { UnidadesMultiplasModule } from './../common/unidades-multiplas/unidades-multiplas.module';
import { CadastrarProjetoComponent } from './cadastrar-projeto/cadastrar-projeto.component';
import { ColaboradoresProjetoComponent } from './cadastrar-projeto/colaboradores-projeto/colaboradores-projeto.component';
import { ComposicaoRhProjetoComponent } from './cadastrar-projeto/composicao-rh-projeto/composicao-rh-projeto.component';
import { DadosProjetoComponent } from './cadastrar-projeto/dados-projeto/dados-projeto.component';
import { ParceriasProjetoComponent } from './cadastrar-projeto/parcerias-projeto/parcerias-projeto.component';
import { ProjetoRoutingModule } from './projeto-routing.module';
import { ProjetoComponent } from './projeto.component';
import { DadosParceiroComponent } from './cadastrar-projeto/parcerias-projeto/dados-parceiro/dados-parceiro.component';
import { MateriaisProjetoComponent } from './cadastrar-projeto/parcerias-projeto/materiais-projeto/materiais-projeto.component';



@NgModule({
  declarations: [
    ProjetoComponent,
    CadastrarProjetoComponent,
    DadosProjetoComponent,
    ColaboradoresProjetoComponent,
    ParceriasProjetoComponent,
    ComposicaoRhProjetoComponent,
    MateriaisProjetoComponent,
    DadosParceiroComponent,
  ],
  imports: [
    CommonModule,
    ProjetoRoutingModule,
    MaterialCommonModule,
    UnidadesMultiplasModule,
    NgxCurrencyModule
  ]
})
export class ProjetoModule { }
