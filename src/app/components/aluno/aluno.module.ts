import { CadastarAlunoComponent } from './cadastar-aluno/cadastar-aluno.component';
import { AlunoComponent } from './aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoRoutingModule } from './aluno-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [AlunoComponent, CadastarAlunoComponent],
  imports: [
    CommonModule,
    AlunoRoutingModule,
    MaterialCommonModule
  ]
})
export class AlunoModule { }
