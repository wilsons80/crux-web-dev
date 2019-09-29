import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagnosticoAtendimentoComponent } from './diagnostico-atendimento.component';
import { CadastrarDiagnosticoAtendimentoComponent } from './cadastrar-diagnostico-atendimento/cadastrar-diagnostico-atendimento.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'diagnosticoatendimento/cadastrar', component: CadastrarDiagnosticoAtendimentoComponent,canActivate: [AuthGuard]},
  { path: 'diagnosticoatendimento', component: DiagnosticoAtendimentoComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosticoAtendimentoRoutingModule { }
