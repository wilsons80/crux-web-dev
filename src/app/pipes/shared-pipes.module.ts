import { CnpjPipe } from './cnpj.pipe';
import { FormatTimePipe } from './format-time.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSimplesPipe } from './data-simples.pipe';



@NgModule({
  declarations: [DataSimplesPipe, FormatTimePipe,CnpjPipe],
  imports: [
    CommonModule
  ],
  exports:[DataSimplesPipe,FormatTimePipe,CnpjPipe]
})
export class SharedPipesModule { }
