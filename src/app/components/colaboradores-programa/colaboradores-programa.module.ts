import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradoresProgramaRoutingModule } from './colaboradores-programa-routing.module';
import { CadastrarColaboradoresProgramaComponent } from './cadastrar-colaboradores-programa/cadastrar-colaboradores-programa.component';
import { ColaboradoresProgramaComponent } from './colaboradores-programa.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [ColaboradoresProgramaComponent,CadastrarColaboradoresProgramaComponent],
  imports: [
    CommonModule,
    ColaboradoresProgramaRoutingModule,
    MaterialCommonModule
  ]
})
export class ColaboradoresProgramaModule { }
