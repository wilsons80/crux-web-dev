import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtividadeComponent } from './atividade.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarAtividadeComponent } from './cadastrar-atividade/cadastrar-atividade.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'atividade/cadastrar', component: CadastrarAtividadeComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ATIVIDADE} },
  { path: 'atividade', component: AtividadeComponent,canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.ATIVIDADE} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtividadeRoutingModule { }
