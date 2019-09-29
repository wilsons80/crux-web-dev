import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarParticipanteAtendimentoComponent } from './cadastrar-participante-atendimento/cadastrar-participante-atendimento.component';
import { ParticipanteAtendimentoComponent } from './participante-atendimento.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'participanteatendimento/cadastrar', component: CadastrarParticipanteAtendimentoComponent, canActivate: [AuthGuard]},
  { path: 'participanteatendimento', component: ParticipanteAtendimentoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipanteAtendimentoRoutingModule { }
