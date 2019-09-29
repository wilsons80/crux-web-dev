import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrequenciaAlunoComponent } from './frequencia-aluno.component';
import { CadastrarFrequenciaAlunoComponent } from './cadastrar-frequencia-aluno/cadastrar-frequencia-aluno.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'frequenciaaluno/cadastrar', component: CadastrarFrequenciaAlunoComponent,canActivate: [AuthGuard]},
  { path: 'frequenciaaluno', component: FrequenciaAlunoComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrequenciaAlunoRoutingModule { }
