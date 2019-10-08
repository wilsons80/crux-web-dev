import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarProdutosAtividadeComponent } from './cadastrar-produtos-atividade/cadastrar-produtos-atividade.component';
import { ProdutosAtividadeComponent } from './produtos-atividade.component';


const routes: Routes = [
  { path: 'produtosatividade/cadastrar', component: CadastrarProdutosAtividadeComponent, canActivate: [AuthGuard] },
  { path: 'produtosatividade', component: ProdutosAtividadeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosAtividadeRoutingModule { }
