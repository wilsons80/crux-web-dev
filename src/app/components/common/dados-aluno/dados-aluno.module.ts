import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosAlunoComponent } from '../../familiar-aluno/dados-aluno/dados-aluno.component';



@NgModule({
  declarations: [DadosAlunoComponent],
  imports: [
    CommonModule
  ],
  exports:[DadosAlunoComponent]
})
export class DadosAlunoModule { }
