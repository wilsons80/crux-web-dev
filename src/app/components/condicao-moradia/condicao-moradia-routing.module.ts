import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CondicaoMoradiaComponent } from './condicao-moradia.component';
import { CadastrarCondicaoMoradiaComponent } from './cadastrar-condicao-moradia/cadastrar-condicao-moradia.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'condicaomoradia/cadastrar', component: CadastrarCondicaoMoradiaComponent, canActivate: [AuthGuard]},
  { path: 'condicaomoradia', component: CondicaoMoradiaComponent, canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondicaoMoradiaRoutingModule { }
