import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { AvaliacaoAluno } from 'src/app/core/avaliacao-aluno';

interface Path {
  rootPath: 'api/avaliacaoaluno/';
}

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoAlunoService extends BaseService<AvaliacaoAluno, Path> {

  constructor(http: HttpClient) {
    super(http);
  }
  
}
