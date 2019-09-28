import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { FrequenciaAluno } from 'src/app/core/frequencia-aluno';

interface Path {
  rootPath: 'api/frequenciaaluno/';
}

@Injectable({
  providedIn: 'root'
})
export class FrequenciaAlunoService extends BaseService<FrequenciaAluno, Path> {

  constructor(http: HttpClient) {
    super(http);
  }
}
