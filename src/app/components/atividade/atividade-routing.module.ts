import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtividadeComponent } from './atividade.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarAtividadeComponent } from './cadastrar-atividade/cadastrar-atividade.component';


const routes: Routes = [
  { path: 'ativdade/cadastrar', component: CadastrarAtividadeComponent,canActivate: [AuthGuard]},
  { path: 'atividade', component: AtividadeComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtividadeRoutingModule { }
