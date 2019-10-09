import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarUnidadeComponent } from './cadastrar-unidade/cadastrar-unidade.component';
import { EscolherUnidadeComponent } from './escolher-unidade/escolher-unidade.component';
import { UnidadeComponent } from './unidade.component';
import { UnidadeResolver } from 'src/app/guards/unidades.resolve';


const routes: Routes = [
  { path: 'unidade/escolher', component: EscolherUnidadeComponent, canActivate: [AuthGuard], resolve: { unidades: UnidadeResolver } },
  { path: 'unidade/cadastrar', component: CadastrarUnidadeComponent, canActivate: [AuthGuard] },
  { path: 'unidade/', component: UnidadeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadeRoutingModule { }
