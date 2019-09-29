import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadeSocialRoutingModule } from './entidade-social-routing.module';
import { EntidadeSocialComponent } from './entidade-social.component';
import { CadastrarEntidadeSocialComponent } from './cadastrar-entidade-social/cadastrar-entidade-social.component';


@NgModule({
  declarations: [EntidadeSocialComponent, CadastrarEntidadeSocialComponent],
  imports: [
    CommonModule,
    EntidadeSocialRoutingModule
  ]
})
export class EntidadeSocialModule { }
