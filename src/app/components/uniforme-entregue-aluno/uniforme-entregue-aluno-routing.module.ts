import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniformeEntregueAlunoComponent } from './uniforme-entregue-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarUniformeEntregueAlunoComponent } from './cadastrar-uniforme-entregue-aluno/cadastrar-uniforme-entregue-aluno.component';


const routes: Routes = [
  { path: 'uniformeentregue/cadastrar', component: CadastrarUniformeEntregueAlunoComponent,canActivate: [AuthGuard]},
  { path: 'uniformeentregue', component: UniformeEntregueAlunoComponent,canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniformeEntregueAlunoRoutingModule { }
