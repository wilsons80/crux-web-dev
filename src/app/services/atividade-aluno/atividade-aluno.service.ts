import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';

interface Path {
  rootPath: 'api/atividadesaluno/';
}

@Injectable({
  providedIn: 'root'
})
export class AtividadeAlunoService extends BaseService<AtividadeAluno, Path> {

  constructor(http: HttpClient) {
    super(http);
  }
}
