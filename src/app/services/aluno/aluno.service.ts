import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluno } from 'src/app/core/aluno';
import { BaseService } from '../base/base.service';

interface Path {
  rootPath: 'api/aluno/';
}

@Injectable({
  providedIn: 'root'
})
export class AlunoService extends BaseService<Aluno, Path> {

  constructor(http: HttpClient) {
    super(http);
  }

}
