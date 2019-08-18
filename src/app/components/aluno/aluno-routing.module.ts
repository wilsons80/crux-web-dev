import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarAlunoComponent } from './cadastrar-aluno/cadastrar-aluno.component';
import { PaginaNaoEncontradaComponent } from '../common/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'aluno/cadastrar', component: CadastrarAlunoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
