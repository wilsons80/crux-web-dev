import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OficinaRoutingModule } from './oficina-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { OficinaComponent } from './oficina.component';


@NgModule({
  declarations: [OficinaComponent],
  imports: [
    CommonModule,
    OficinaRoutingModule,
    MaterialCommonModule
  ]
})
export class OficinaModule { }
