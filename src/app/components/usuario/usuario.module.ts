import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';


@NgModule({
  declarations: [UsuarioComponent, CadastrarUsuarioComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialCommonModule
  ]
})
export class UsuarioModule { }
