import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';
import { ProdutoComponent } from './produto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'produto', component: ProdutoComponent,canActivate: [AuthGuard]},
  { path: 'produto/cadastrar', component: CadastrarProdutoComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
