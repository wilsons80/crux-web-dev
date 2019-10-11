import { CadastrarColaboradoresProgramaComponent } from './cadastrar-colaboradores-programa/cadastrar-colaboradores-programa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradoresProgramaComponent } from './colaboradores-programa.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  {path: 'colaboradoresprograma/cadastrar', component:CadastrarColaboradoresProgramaComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.COLABORADORES_PROGRAMA} },
  {path: 'colaboradoresprograma', component:ColaboradoresProgramaComponent, canActivate:[AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.COLABORADORES_PROGRAMA} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradoresProgramaRoutingModule { }
