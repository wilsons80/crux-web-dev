import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AcessoModuloResolver } from 'src/app/guards/acesso-modulo.resolve';
import { Modulos } from 'src/app/core/modulos';
import { CadastrarMateriaisAtividadeComponent } from './materiais-atividade/cadastrar-materiais-atividade.component';
import { MateriaisAtividadeComponent } from './materiais-atividade.component';


const routes: Routes = [
  { path: 'materiaisatividade/cadastrar', component: CadastrarMateriaisAtividadeComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.MATERIAIS_ATIVIDADE}  },
  { path: 'materiaisatividade', component: MateriaisAtividadeComponent, canActivate: [AuthGuard],resolve: {perfilAcesso:AcessoModuloResolver}, data:{modulo:Modulos.MATERIAIS_ATIVIDADE}  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriaisAtividadeRoutingModule { }
