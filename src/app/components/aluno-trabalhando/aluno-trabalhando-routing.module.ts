import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunoTrabalhandoComponent } from './aluno-trabalhando.component';
import { CadastrarAlunoTrabalhandoComponent } from './cadastrar-aluno-trabalhando/cadastrar-aluno-trabalhando.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'alunotrabalhando/cadastrar', component: CadastrarAlunoTrabalhandoComponent, canActivate: [AuthGuard]},
  { path: 'alunotrabalhando', component: AlunoTrabalhandoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoTrabalhandoRoutingModule { }
