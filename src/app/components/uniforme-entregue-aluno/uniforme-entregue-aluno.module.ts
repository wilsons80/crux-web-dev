import { UniformeEntregueAlunoComponent } from './uniforme-entregue-aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniformeEntregueAlunoRoutingModule } from './uniforme-entregue-aluno-routing.module';
import { CadastrarUniformeEntregueAlunoComponent } from './cadastrar-uniforme-entregue-aluno/cadastrar-uniforme-entregue-aluno.component';


@NgModule({
  declarations: [UniformeEntregueAlunoComponent, CadastrarUniformeEntregueAlunoComponent],
  imports: [
    CommonModule,
    UniformeEntregueAlunoRoutingModule
  ]
})
export class UniformeEntregueAlunoModule { }
