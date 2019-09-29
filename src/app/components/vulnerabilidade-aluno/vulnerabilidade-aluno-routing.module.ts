import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VulnerabilidadeAlunoComponent } from './vulnerabilidade-aluno.component';
import { CadastrarVulnerabilidadeAlunoComponent } from './cadastrar-vulnerabilidade-aluno/cadastrar-vulnerabilidade-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'vulnerabilidadealuno/cadastrar', component: CadastrarVulnerabilidadeAlunoComponent,canActivate: [AuthGuard]},
  { path: 'vulnerabilidadealuno', component: VulnerabilidadeAlunoComponent,canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VulnerabilidadeAlunoRoutingModule { }
