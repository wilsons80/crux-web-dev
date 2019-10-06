import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Familiares } from 'src/app/core/familiares';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';


@Injectable({
  providedIn: 'root'
})
export class FamiliarAlunoService extends BaseService<Familiares> {

  constructor(http: HttpClient) {
    super(http, Rotas.FAMILIARES);
  }


  getFamiliaresPorAluno(id: number) {
    return this.http.get(`${Rotas.FAMILIARES}aluno/${id}`);
  }
  
}
