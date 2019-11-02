import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { CadastrarEmpresaComponent } from './cadastrar-empresa/cadastrar-empresa.component';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';



@NgModule({
  declarations: [EmpresaComponent, CadastrarEmpresaComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    MaterialCommonModule,
    SharedDirectivesModule
  ]
})
export class EmpresaModule { }
