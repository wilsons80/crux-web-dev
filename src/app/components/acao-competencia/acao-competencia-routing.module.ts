import { CadastrarAcaoCompetenciaComponent } from './cadastrar-acao-competencia/cadastrar-acao-competencia.component';
import { AcaoCompetenciaComponent } from './acao-competencia.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'acaocompetencia/cadastrar', component: CadastrarAcaoCompetenciaComponent,canActivate: [AuthGuard]},
  { path: 'acaocompetencia', component: AcaoCompetenciaComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcaoCompetenciaRoutingModule { }
