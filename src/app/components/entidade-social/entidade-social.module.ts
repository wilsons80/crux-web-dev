import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadeSocialRoutingModule } from './entidade-social-routing.module';
import { EntidadeSocialComponent } from './entidade-social.component';
import { CadastrarEntidadeSocialComponent } from './cadastrar-entidade-social/cadastrar-entidade-social.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [EntidadeSocialComponent, CadastrarEntidadeSocialComponent],
  imports: [
    CommonModule,
    EntidadeSocialRoutingModule,
    MaterialCommonModule
  ]
})
export class EntidadeSocialModule { }
