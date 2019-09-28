import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { EncaminhamentoAluno } from 'src/app/core/encaminhamento-aluno';

interface Path {
  rootPath: 'api/encaminhaaluno/';
}

@Injectable({
  providedIn: 'root'
})
export class EncaminhamentoAlunoService extends BaseService<EncaminhamentoAluno, Path> {

  constructor(http: HttpClient) {
    super(http);
  }
}
