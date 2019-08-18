import { FlexLayoutModule } from '@angular/flex-layout';
import { UnidadeRoutingModule } from './unidade-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscolherUnidadeComponent } from './escolher-unidade/escolher-unidade.component';
import { MatButtonModule, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [EscolherUnidadeComponent],
  imports: [
    CommonModule,
    UnidadeRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule
    
  ]
})
export class UnidadeModule { }
