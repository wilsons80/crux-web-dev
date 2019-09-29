import { AlunoTrabalhandoComponent } from './aluno-trabalhando.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoTrabalhandoRoutingModule } from './aluno-trabalhando-routing.module';
import { CadastrarAlunoTrabalhandoComponent } from './cadastrar-aluno-trabalhando/cadastrar-aluno-trabalhando.component';


@NgModule({
  declarations: [AlunoTrabalhandoComponent, CadastrarAlunoTrabalhandoComponent],
  imports: [
    CommonModule,
    AlunoTrabalhandoRoutingModule
  ]
})
export class AlunoTrabalhandoModule { }
