import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarAlunoComponent } from './cadastrar-aluno/cadastrar-aluno.component';
import { PaginaNaoEncontradaComponent } from '../common/pagina-nao-encontrada/pagina-nao-encontrada.component';


const routes: Routes = [
  { path: 'aluno', component: CadastrarAlunoComponent },
  { path: '**', component: PaginaNaoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
