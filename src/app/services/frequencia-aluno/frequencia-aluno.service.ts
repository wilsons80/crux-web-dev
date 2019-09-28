import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { FrequenciaAluno } from 'src/app/core/frequencia-aluno';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class FrequenciaAlunoService extends BaseService<FrequenciaAluno> {

  constructor(http: HttpClient) {
    super(http, Rotas.FREQUENCIA_ALUNO);
  }
}
