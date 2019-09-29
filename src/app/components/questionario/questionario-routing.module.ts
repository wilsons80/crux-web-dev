import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarQuestionarioComponent } from './cadastrar-questionario/cadastrar-questionario.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { QuestionarioComponent } from './questionario.component';


const routes: Routes = [
  { path: 'questionario/cadastrar', component: CadastrarQuestionarioComponent,canActivate: [AuthGuard]},
  { path: 'questionario', component: QuestionarioComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionarioRoutingModule { }
