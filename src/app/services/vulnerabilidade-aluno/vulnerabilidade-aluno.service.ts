import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { VulnerabilidadesAluno } from 'src/app/core/vulnerabilidades-aluno';

interface Path {
  rootPath: 'api/vulnerabilidadesaluno/';
}

@Injectable({
  providedIn: 'root'
})
export class VulnerabilidadeAlunoService extends BaseService<VulnerabilidadesAluno, Path> {

  constructor(http: HttpClient) {
    super(http);
  }

}
