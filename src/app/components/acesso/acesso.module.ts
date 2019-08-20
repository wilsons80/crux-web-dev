import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcessoRoutingModule } from './acesso-routing.module';
import { AcessoComponent } from './acesso.component';


@NgModule({
  declarations: [AcessoComponent],
  imports: [
    CommonModule,
    AcessoRoutingModule
  ]
})
export class AcessoModule { }
