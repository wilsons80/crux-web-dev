import { VulnerabilidadeAlunoComponent } from './vulnerabilidade-aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VulnerabilidadeAlunoRoutingModule } from './vulnerabilidade-aluno-routing.module';
import { CadastrarVulnerabilidadeAlunoComponent } from './cadastrar-vulnerabilidade-aluno/cadastrar-vulnerabilidade-aluno.component';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';


@NgModule({
  declarations: [VulnerabilidadeAlunoComponent, CadastrarVulnerabilidadeAlunoComponent],
  imports: [
    CommonModule,
    VulnerabilidadeAlunoRoutingModule,
    MaterialCommonModule
  ]
})
export class VulnerabilidadeAlunoModule { }
