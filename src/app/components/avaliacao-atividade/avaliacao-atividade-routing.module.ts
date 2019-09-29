import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvaliacaoAtividadeComponent } from './avaliacao-atividade.component';
import { CadastrarAvaliacaoAtividadeComponent } from './cadastrar-avaliacao-atividade/cadastrar-avaliacao-atividade.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'avaliacaoatividade/cadastrar', component: CadastrarAvaliacaoAtividadeComponent,canActivate: [AuthGuard]},
  { path: 'avaliacaoatividade', component: AvaliacaoAtividadeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvaliacaoAtividadeRoutingModule { }
