import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SituacaoVulnerabilidadeComponent } from './situacao-vulnerabilidade.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarSituacaoVulnerabilidadeComponent } from './cadastrar-situacao-vulnerabilidade/cadastrar-situacao-vulnerabilidade.component';


const routes: Routes = [
  { path: 'situacaovulnerabilidade/cadastrar', component: CadastrarSituacaoVulnerabilidadeComponent,canActivate: [AuthGuard]},
  { path: 'situacaovulnerabilidade', component: SituacaoVulnerabilidadeComponent ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SituacaoVulnerabilidadeRoutingModule { }
