import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponsaveisAluno } from 'src/app/core/responsaveis-aluno';
import { BaseService } from '../base/base.service';

interface Path {
  rootPath: 'api/responsaveisaluno/';
}

@Injectable({
  providedIn: 'root'
})
export class ResponsavelAlunoService extends BaseService<ResponsaveisAluno, Path> {

  constructor(http: HttpClient) {
    super(http);
  }

}
