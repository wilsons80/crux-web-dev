import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoRoutingModule } from './curso-routing.module';
import { CadastrarCursoComponent } from './cadastrar-curso/cadastrar-curso.component';
import { AlterarCursoComponent } from './alterar-curso/alterar-curso.component';
import { DeletarCursoComponent } from './deletar-curso/deletar-curso.component';
import { ConsultarCursoComponent } from './consultar-curso/consultar-curso.component';


@NgModule({
  declarations: [CadastrarCursoComponent, AlterarCursoComponent, DeletarCursoComponent, ConsultarCursoComponent],
  imports: [
    CommonModule,
    CursoRoutingModule
  ]
})
export class CursoModule { }
