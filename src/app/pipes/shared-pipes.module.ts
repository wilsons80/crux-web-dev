import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSimplesPipe } from './data-simples.pipe';



@NgModule({
  declarations: [DataSimplesPipe],
  imports: [
    CommonModule
  ],
  exports:[DataSimplesPipe]
})
export class SharedPipesModule { }
