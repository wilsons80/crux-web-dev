import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColaboradoresComponent } from './colaboradores.component';



@NgModule({
  declarations: [ColaboradoresComponent],
  imports: [
    CommonModule,
    MaterialCommonModule
  ]
})
export class ColaboradoresModule { }
