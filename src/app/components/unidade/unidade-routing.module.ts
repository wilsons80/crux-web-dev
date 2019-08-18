import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from '../common/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { EscolherUnidadeComponent } from './escolher-unidade/escolher-unidade.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'unidade/escolher', component: EscolherUnidadeComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadeRoutingModule { }
