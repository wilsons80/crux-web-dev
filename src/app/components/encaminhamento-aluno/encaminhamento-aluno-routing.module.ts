import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarEncaminhamentoAlunoComponent } from './cadastrar-encaminhamento-aluno/cadastrar-encaminhamento-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EncaminhamentoAlunoComponent } from './encaminhamento-aluno.component';


const routes: Routes = [
  { path: 'encaminhamentoaluno/cadastrar', component: CadastrarEncaminhamentoAlunoComponent,canActivate: [AuthGuard]},
  { path: 'encaminhamentoaluno', component: EncaminhamentoAlunoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncaminhamentoAlunoRoutingModule { }
