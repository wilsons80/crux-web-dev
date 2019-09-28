import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { VulnerabilidadesAluno } from 'src/app/core/vulnerabilidades-aluno';

const rootPath = 'api/vulnerabilidadesfamiliar/';

@Injectable({
  providedIn: 'root'
})
export class VulnerabilidadeAlunoService extends BaseService<VulnerabilidadesAluno> {

  constructor(http: HttpClient) {
    super(http, rootPath);
  }

}
