import { CadastarAlunoComponent } from './cadastar-aluno/cadastar-aluno.component';
import { AlunoComponent } from './aluno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoRoutingModule } from './aluno-routing.module';
import { MaterialCommonModule } from 'src/app/material-modules/material-common.module';
import { PessoaFisicaModule } from '../common/pessoa-fisica/pessoa-fisica.module';
import { VulnerabilidadeAlunoComponent } from './vulnerabilidade-aluno/vulnerabilidade-aluno.component';
import { CadastrarVulnerabilidadeAlunoComponent } from './vulnerabilidade-aluno/cadastrar-vulnerabilidade-aluno/cadastrar-vulnerabilidade-aluno.component';
import { ListarVulnerabilidadeAlunoComponent } from './vulnerabilidade-aluno/listar-vulnerabilidade-aluno/listar-vulnerabilidade-aluno.component';
import { MatExpansionModule } from '@angular/material';


@NgModule({
  declarations: [AlunoComponent, CadastarAlunoComponent, VulnerabilidadeAlunoComponent, CadastrarVulnerabilidadeAlunoComponent, ListarVulnerabilidadeAlunoComponent],
  imports: [
    CommonModule,
    AlunoRoutingModule,
    PessoaFisicaModule,
    MaterialCommonModule,
    MatExpansionModule
  ]
})
export class AlunoModule { }
