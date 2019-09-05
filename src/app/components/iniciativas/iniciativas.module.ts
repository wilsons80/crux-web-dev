import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IniciativasRoutingModule } from './iniciativas-routing.module';
import { IniciativasComponent } from './iniciativas.component';


@NgModule({
  declarations: [IniciativasComponent],
  imports: [
    CommonModule,
    IniciativasRoutingModule
  ]
})
export class IniciativasModule { }
