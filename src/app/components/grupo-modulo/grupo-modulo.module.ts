import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrupoModuloRoutingModule } from './grupo-modulo-routing.module';
import { MatExpansionModule } from '@angular/material';
import { CadastrarGrupoModuloComponent } from './cadastrar-grupo-modulo/cadastrar-grupo-modulo.component';
import { GrupoModuloComponent } from './grupo-modulo.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [GrupoModuloComponent, CadastrarGrupoModuloComponent],
  imports: [
    CommonModule,
    GrupoModuloRoutingModule,
    MaterialCommonModule,
    MatExpansionModule
  ]
})
export class GrupoModuloModule { }
