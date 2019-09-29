import { FaltasFuncionario } from './../../core/faltas-funcionario';
import { CadastrarFaltasFuncionarioComponent } from './cadastrar-faltas-funcionario/cadastrar-faltas-funcionario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FaltasFuncionarioComponent } from './faltas-funcionario.component';

const routes: Routes = [
  { path: 'faltasfuncionario/cadastrar', component: CadastrarFaltasFuncionarioComponent,canActivate: [AuthGuard]},
  { path: 'faltasfuncionario', component: FaltasFuncionarioComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaltasFuncionarioRoutingModule { }
