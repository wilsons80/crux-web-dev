import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradoresProjetoRoutingModule } from './colaboradores-projeto-routing.module';
import { CadastrarColaboradoresProjetoComponent } from './cadastrar-colaboradores-projeto/cadastrar-colaboradores-projeto.component';
import { ColaboradoresProjetoComponent } from './colaboradores-projeto.component';


@NgModule({
  declarations: [ColaboradoresProjetoComponent ,CadastrarColaboradoresProjetoComponent],
  imports: [
    CommonModule,
    ColaboradoresProjetoRoutingModule,
    MaterialCommonModule
  ]
})
export class ColaboradoresProjetoModule { }
