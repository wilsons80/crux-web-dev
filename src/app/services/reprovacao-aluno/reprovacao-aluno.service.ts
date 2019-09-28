import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ReprovacaoAluno } from 'src/app/core/reprovacao-aluno';

interface Path {
  rootPath: 'api/reprovacaoalino/';
}

@Injectable({
  providedIn: 'root'
})
export class ReprovacaoAlunoService extends BaseService<ReprovacaoAluno, Path> {

  constructor(http: HttpClient) {
    super(http);
  }
  
}
