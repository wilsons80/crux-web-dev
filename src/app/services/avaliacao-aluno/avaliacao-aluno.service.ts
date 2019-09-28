import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { AvaliacaoAluno } from 'src/app/core/avaliacao-aluno';
import { Rotas } from 'src/app/core/rotas';


@Injectable({
  providedIn: 'root'
})
export class AvaliacaoAlunoService extends BaseService<AvaliacaoAluno> {

  constructor(http: HttpClient) {
    super(http, Rotas.AVALIACAO_ALUNO);
  }
  
}
