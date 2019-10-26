import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvaliacaoAlunoComponent } from './avaliacao-aluno.component';
import { CadastrarAvaliacaoAlunoComponent } from './cadastrar-avaliacao-aluno/cadastrar-avaliacao-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'avaliacaoaluno/cadastrar', component: CadastrarAvaliacaoAlunoComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.AVALIACAO_ALUNO}},
  { path: 'avaliacaoaluno', component: AvaliacaoAlunoComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.AVALIACAO_ALUNO}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvaliacaoAlunoRoutingModule { }
