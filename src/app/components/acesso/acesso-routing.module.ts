import { CadastrarAcessoComponent } from './cadastrar-acesso/cadastrar-acesso.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'acesso/:idUnidade/cadastrar', component: CadastrarAcessoComponent},
  //{ path: 'acesso/:idUnidade/cadastrar', component: CadastrarAcessoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcessoRoutingModule { }
