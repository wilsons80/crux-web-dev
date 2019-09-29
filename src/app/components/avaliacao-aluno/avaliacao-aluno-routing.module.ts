import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvaliacaoAlunoComponent } from './avaliacao-aluno.component';
import { CadastrarAvaliacaoAlunoComponent } from './cadastrar-avaliacao-aluno/cadastrar-avaliacao-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'avaliacaoaaluno/cadastrar', component: CadastrarAvaliacaoAlunoComponent, canActivate: [AuthGuard]},
  { path: 'avaliacaoaluno', component: AvaliacaoAlunoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvaliacaoAlunoRoutingModule { }
