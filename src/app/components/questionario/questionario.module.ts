import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionarioRoutingModule } from './questionario-routing.module';
import { QuestionarioComponent } from './questionario.component';
import { CadastrarQuestionarioComponent } from './cadastrar-questionario/cadastrar-questionario.component';


@NgModule({
  declarations: [QuestionarioComponent, CadastrarQuestionarioComponent],
  imports: [
    CommonModule,
    QuestionarioRoutingModule
  ]
})
export class QuestionarioModule { }
