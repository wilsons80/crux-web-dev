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

  getByAluno(idAluno:number){
    return this.http.get(Rotas.ATIVIDADE_ALUNO + `aluno/${idAluno}`)
  }
 
  getByAtividade(idAtividade:number){
    return this.http.get(Rotas.ATIVIDADE_ALUNO + `atividade/${idAtividade}`)
  }
 
  getByAlunoEAtividade(idAluno:number,idAtivdade:number){
    return this.http.get(Rotas.ATIVIDADE_ALUNO + `aluno/${idAluno}/atividade/${idAtivdade}`)
  }

}
