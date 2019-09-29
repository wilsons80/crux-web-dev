import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarAtividadeAlunoComponent } from './cadastrar-atividade-aluno/cadastrar-atividade-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AtividadeAlunoComponent } from './atividade-aluno.component';


const routes: Routes = [
  { path: 'atividadealuno/cadastrar', component: CadastrarAtividadeAlunoComponent,canActivate: [AuthGuard]},
  { path: 'atividadealuno', component: AtividadeAlunoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtividadeAlunoRoutingModule { }
