import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurmasRoutingModule } from './turmas-routing.module';
import { CadastrarTurmasComponent } from './cadastrar-turmas/cadastrar-turmas.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';

@NgModule({
  declarations: [CadastrarTurmasComponent],
  imports: [
    CommonModule,
    TurmasRoutingModule,
    MaterialCommonModule
  ]
})
export class TurmasModule { }
