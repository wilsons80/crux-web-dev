import { CadastrarDepartamentoComponent } from './cadastrar-departamento/cadastrar-departamento.component';
import { DepartamentoComponent } from './departamento.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'departamento/cadastrar', component: CadastrarDepartamentoComponent,canActivate: [AuthGuard]},
  { path: 'departamento/:idUnidade', component: DepartamentoComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
