import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class AtividadeAlunoService extends BaseService<AtividadeAluno> {

  constructor(http: HttpClient) {
    super(http, Rotas.ATIVIDADE_ALUNO);
  }

  getAllFiltro(idAluno: number|string, idAtividade: number|string) {
    if (idAluno === undefined) { idAluno = ''; }
    if (idAtividade === undefined) { idAtividade = ''; }

    return this.http.get(Rotas.ATIVIDADE_ALUNO , { params: {
       aluno: `${idAluno}`,
       entidadesocial: `${idAtividade}`
    }});
  }

  getAllAlunosMatriculadosNaAtividadeNoPeriodo(idAtividade: number, data: Date) {
    return this.http.get(Rotas.ATIVIDADE_ALUNO + 'matriculado/atividade/' + idAtividade , { params: {
      data: `${data.getTime()}`
   }});
  }

  getAtividadeAlunoNaData(idAtividade: number, idAluno: number, data: Date) {
    return this.http.get(Rotas.ATIVIDADE_ALUNO + `aluno/${idAluno}/atividade/${idAtividade}/data/${data.getTime()}`);
  }
  
}
