import { CadastrarPlanosAcaoComponent } from './cadastrar-planos-acao/cadastrar-planos-acao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PlanosAcaoComponent } from './planos-acao.component';


const routes: Routes = [

  { path: 'planosacao/cadastrar', component: CadastrarPlanosAcaoComponent,canActivate: [AuthGuard]},
  { path: 'planosacao', component: PlanosAcaoComponent,canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanosAcaoRoutingModule { }
