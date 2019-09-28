import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { UniformeAluno } from 'src/app/core/uniforme-aluno';

interface Path {
  rootPath: 'api/uniformealuno/';
}

@Injectable({
  providedIn: 'root'
})
export class UniformeEntregeAlunoService extends BaseService<UniformeAluno, Path> {

  constructor(http: HttpClient) {
    super(http);
  }
}
