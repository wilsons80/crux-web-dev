import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReprovacaoAlunoComponent } from './reprovacao-aluno.component';
import { CadastrarReprovacaoAlunoComponent } from './cadastrar-reprovacao-aluno/cadastrar-reprovacao-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'reprovacaoaluno/cadastrar', component: CadastrarReprovacaoAlunoComponent,canActivate: [AuthGuard]},
  { path: 'reprovacaoaluno', component: ReprovacaoAlunoComponent,canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReprovacaoAlunoRoutingModule { }
