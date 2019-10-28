import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { UniformeAluno } from 'src/app/core/uniforme-aluno';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class UniformeEntregeAlunoService extends BaseService<UniformeAluno> {

  constructor(http: HttpClient) {
    super(http, Rotas.UNIFORME_ALUNO);
  }

  alterarAll(uniformesAluno: UniformeAluno[], idAtividade: number, data: Date ) {
    return this.http.put(`${Rotas.UNIFORME_ALUNO}atividade/${idAtividade}`, uniformesAluno, { params : {
      data: `${data.getTime()}`
    }});
  }

  getAllAlunosMatriculadosNaAtividadeNoPeriodo(idAtividade: number, dataReferencia: Date) {
    return this.http.get(Rotas.UNIFORME_ALUNO + 'matriculado/atividade/' + idAtividade, { params: {
      dataReferencia: `${dataReferencia.getTime()}`
    }});
  }

}
