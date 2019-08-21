import { AlterarAcessoComponent } from './alterar-acesso/alterar-acesso.component';
import { ConsultarAcessoComponent } from './consultar-acesso/consultar-acesso.component';
import { CadastrarAcessoComponent } from './cadastrar-acesso/cadastrar-acesso.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DeletarAcessoComponent } from './deletar-acesso/deletar-acesso.component';


const routes: Routes = [
  { path: 'acesso/:idUnidade/cadastrar', component: CadastrarAcessoComponent, canActivate: [AuthGuard]},
  { path: 'acesso/:idUnidade/consultar', component: ConsultarAcessoComponent},
  { path: 'acesso/:idUnidade/deletar', component: DeletarAcessoComponent},
  { path: 'acesso/:idUnidade/alterar', component: AlterarAcessoComponent},
  //{ path: 'acesso/:idUnidade/cadastrar', component: CadastrarAcessoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcessoRoutingModule { }
