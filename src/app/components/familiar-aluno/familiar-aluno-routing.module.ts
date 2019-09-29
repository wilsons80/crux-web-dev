import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamiliarAlunoComponent } from './familiar-aluno.component';
import { CadastrarFamiliarAlunoComponent } from './cadastrar-familiar-aluno/cadastrar-familiar-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'familiaraluno/cadastrar', component: CadastrarFamiliarAlunoComponent,canActivate: [AuthGuard]},
  { path: 'familiaraluno', component: FamiliarAlunoComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliarAlunoRoutingModule { }
