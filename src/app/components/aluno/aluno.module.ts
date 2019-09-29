import { CadastarAlunoComponent } from './cadastar-aluno/cadastar-aluno.component';
import { AlunoComponent } from './aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoRoutingModule } from './aluno-routing.module';


@NgModule({
  declarations: [AlunoComponent, CadastarAlunoComponent],
  imports: [
    CommonModule,
    AlunoRoutingModule
  ]
})
export class AlunoModule { }
