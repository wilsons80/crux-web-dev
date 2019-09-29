import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastarAlunoComponent } from './cadastar-aluno/cadastar-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AlunoComponent } from './aluno.component';


const routes: Routes = [
  { path: 'aluno/cadastrar', component: CadastarAlunoComponent,canActivate: [AuthGuard]},
  { path: 'aluno', component: AlunoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [AlunoComponent, CadastarAlunoComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
