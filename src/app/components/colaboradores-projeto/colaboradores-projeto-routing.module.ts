import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarColaboradoresProjetoComponent } from './cadastrar-colaboradores-projeto/cadastrar-colaboradores-projeto.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ColaboradoresProjetoComponent } from './colaboradores-projeto.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  {path: 'colaboradoresprojeto/cadastrar', component:CadastrarColaboradoresProjetoComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.COLABORADORES_PROJETO} },
  {path: 'colaboradoresprojeto', component:ColaboradoresProjetoComponent, canActivate:[AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.COLABORADORES_PROJETO} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradoresProjetoRoutingModule { }
