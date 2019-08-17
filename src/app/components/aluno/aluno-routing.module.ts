import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarAlunoComponent } from './cadastrar-aluno/cadastrar-aluno.component';


const routes: Routes = [
  { path: 'aluno', component: CadastrarAlunoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
