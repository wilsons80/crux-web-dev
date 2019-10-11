import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarProdutosAtividadeComponent } from './cadastrar-produtos-atividade/cadastrar-produtos-atividade.component';
import { ProdutosAtividadeComponent } from './produtos-atividade.component';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';


const routes: Routes = [
  { path: 'produtosatividade/cadastrar', component: CadastrarProdutosAtividadeComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PRODUTOS_ATIVIDADE}  },
  { path: 'produtosatividade', component: ProdutosAtividadeComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.PRODUTOS_ATIVIDADE}  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosAtividadeRoutingModule { }
