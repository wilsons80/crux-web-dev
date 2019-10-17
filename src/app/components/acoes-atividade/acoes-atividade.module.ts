import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { AcoesAtividadeRoutingModule } from './acoes-atividade-routing.module';
import { AcoesAtividadeComponent } from './acoes-atividade.component';
import { CadastrarAcoesAtividadeComponent } from './cadastrar-acoes-atividade/cadastrar-acoes-atividade.component';



@NgModule({
  declarations: [CadastrarAcoesAtividadeComponent, AcoesAtividadeComponent],
  imports: [
    CommonModule,
    AcoesAtividadeRoutingModule,
    MaterialCommonModule
  ]
})
export class AcoesAtividadeModule { }
