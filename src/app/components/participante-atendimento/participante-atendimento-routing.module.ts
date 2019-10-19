import { ParticipanteAtendimentoComponent } from './participante-atendimento.component';
import { ParticipanteAtendimento } from 'src/app/core/participante-atendimento';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarParticipanteAtendimentoComponent } from './cadastrar-participante-atendimento/cadastrar-participante-atendimento.component';


const routes: Routes = [
  { path: 'participanteatendimento/cadastrar', component: CadastrarParticipanteAtendimentoComponent, canActivate: [AuthGuard] },
  { path: 'participanteatendimento', component: ParticipanteAtendimentoComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipanteAtendimentoRoutingModule { }
