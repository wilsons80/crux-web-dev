import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResponsavelAlunoComponent } from './responsavel-aluno.component';
import { CadastrarResponsavelAlunoComponent } from './cadastrar-responsavel-aluno/cadastrar-responsavel-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'responsavelaluno/cadastrar', component: CadastrarResponsavelAlunoComponent,canActivate: [AuthGuard]},
  { path: 'responsavelaluno', component: ResponsavelAlunoComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsavelAlunoRoutingModule { }
