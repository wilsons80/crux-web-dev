import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarUnidadeComponent } from './cadastrar-unidade/cadastrar-unidade.component';
import { EscolherUnidadeComponent } from './escolher-unidade/escolher-unidade.component';
import { UnidadeComponent } from './unidade.component';


const routes: Routes = [
  { path: 'unidade/escolher', component: EscolherUnidadeComponent, canActivate: [AuthGuard] },
  { path: 'unidade/cadastrar', component: CadastrarUnidadeComponent },
  { path: 'unidade/:idUnidade', component: UnidadeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadeRoutingModule { }
