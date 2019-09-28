import { AuthGuard } from './../../guards/auth.guard';
import { CadastrarCursoFormacaoComponent } from './cadastrar-curso-formacao/cadastrar-curso-formacao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoFormacaoComponent } from './curso-formacao.component';


const routes: Routes = [
  {path: 'cursoformacao/cadastrar', component: CadastrarCursoFormacaoComponent, canActivate: [AuthGuard]},
  {path: 'cadastrar', component: CursoFormacaoComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursoFormacaoRoutingModule { }
