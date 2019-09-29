import { MaterialCommonModule } from './../../material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentoRoutingModule } from './talento-routing.module';
import { TalentoComponent } from './talento.component';
import { CadastrarTalentoComponent } from './cadastrar-talento/cadastrar-talento.component';


@NgModule({
  declarations: [TalentoComponent, CadastrarTalentoComponent],
  imports: [
    CommonModule,
    TalentoRoutingModule,
    MaterialCommonModule
  ]
})
export class TalentoModule { }
