import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurmasRoutingModule } from './turmas-routing.module';
import { CadastrarTurmasComponent } from './cadastrar-turmas/cadastrar-turmas.component';


@NgModule({
  declarations: [CadastrarTurmasComponent],
  imports: [
    CommonModule,
    TurmasRoutingModule
  ]
})
export class TurmasModule { }
