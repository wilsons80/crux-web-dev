import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolucaoAtendimentoComponent } from './solucao-atendimento.component';
import { CadastrarSolucaoAtendimentoComponent } from './cadastrar-solucao-atendimento/cadastrar-solucao-atendimento.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'solucaoatendimento/cadastrar', component: CadastrarSolucaoAtendimentoComponent,canActivate: [AuthGuard]},
  { path: 'solucaoatendimento', component: SolucaoAtendimentoComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolucaoAtendimentoRoutingModule { }
