import { FormatTimePipe } from './format-time.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSimplesPipe } from './data-simples.pipe';



@NgModule({
  declarations: [DataSimplesPipe, FormatTimePipe],
  imports: [
    CommonModule
  ],
  exports:[DataSimplesPipe,FormatTimePipe]
})
export class SharedPipesModule { }
