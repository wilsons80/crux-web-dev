import { AuthGuard } from './../../guards/auth.guard';
import { FuncionarioComponent } from './funcionario.component';
import { CadastrarFuncionarioComponent } from './cadastrar-funcionario/cadastrar-funcionario.component';
import { Funcionario } from './../../core/funcionario';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'funcionario/cadastrar', component: CadastrarFuncionarioComponent,canActivate: [AuthGuard]},
  {path: 'funcionario', component: FuncionarioComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
