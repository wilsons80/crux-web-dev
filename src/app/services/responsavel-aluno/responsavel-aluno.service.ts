import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponsaveisAluno } from 'src/app/core/responsaveis-aluno';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelAlunoService extends BaseService<ResponsaveisAluno> {

  constructor(http: HttpClient) {
    super(http, Rotas.RESPONSAVEL_ALUNO);
  }

}
