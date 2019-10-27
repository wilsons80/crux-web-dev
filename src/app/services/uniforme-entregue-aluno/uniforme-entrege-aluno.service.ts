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

  getAllFiltro(idAluno: number|string, idAtividade: number|string) {
    if (idAluno === undefined) { idAluno = ''; }
    if (idAtividade === undefined) { idAtividade = ''; }

    return this.http.get(Rotas.UNIFORME_ALUNO , { params: {
       aluno: `${idAluno}`,
       atividade: `${idAtividade}`
    }});
  }

}
