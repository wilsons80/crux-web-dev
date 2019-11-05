import { NgxCurrencyModule } from 'ngx-currency';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosAtividadeRoutingModule } from './produtos-atividade-routing.module';
import { CadastrarProdutosAtividadeComponent } from './cadastrar-produtos-atividade/cadastrar-produtos-atividade.component';
import { ProdutosAtividadeComponent } from './produtos-atividade.component';
import { DadosAtividadeModule } from '../common/dados-atividade/dados-atividade.module';


@NgModule({
  declarations: [ProdutosAtividadeComponent,CadastrarProdutosAtividadeComponent],
  imports: [
    CommonModule,
    ProdutosAtividadeRoutingModule,
    MaterialCommonModule,
    NgxCurrencyModule,
    DadosAtividadeModule
  ]
})
export class ProdutosAtividadeModule { }
