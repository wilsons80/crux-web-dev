import { NgxCurrencyModule } from 'ngx-currency';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosAtividadeModule } from '../common/dados-atividade/dados-atividade.module';
import { MateriaisAtividadeComponent } from './materiais-atividade.component';
import { CadastrarMateriaisAtividadeComponent } from './materiais-atividade/cadastrar-materiais-atividade.component';
import { MateriaisAtividadeRoutingModule } from './materiais-atividade-routing.module';


@NgModule({
  declarations: [MateriaisAtividadeComponent,CadastrarMateriaisAtividadeComponent],
  imports: [
    CommonModule,
    MateriaisAtividadeRoutingModule,
    MaterialCommonModule,
    NgxCurrencyModule,
    DadosAtividadeModule
  ]
})
export class MateriaisAtividadeModule { }
