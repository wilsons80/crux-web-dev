import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { DadosFuncionarioModule } from './../common/dados-funcionario/dados-funcionario.module';
import { UnidadesMultiplasModule } from './../common/unidades-multiplas/unidades-multiplas.module';
import { CadastrarProgramasComponent } from './cadastrar-programas/cadastrar-programas.component';
import { DadosProgramaComponent } from './cadastrar-programas/dados-programa/dados-programa.component';
import { ProgramasRoutingModule } from './programas-routing.module';
import { ProgramasComponent } from './programas.component';



@NgModule({
  declarations: [ProgramasComponent, CadastrarProgramasComponent, DadosProgramaComponent],
  imports: [
    CommonModule,
    ProgramasRoutingModule,
    MaterialCommonModule,
    DadosFuncionarioModule,
    UnidadesMultiplasModule
  ]
})
export class ProgramasModule { }
