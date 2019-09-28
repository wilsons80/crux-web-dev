import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { AlunoTrabalhando } from 'src/app/core/aluno-trabalhando';

interface Path {
  rootPath: 'api/alunostrabalhando/';
}

@Injectable({
  providedIn: 'root'
})
export class AlunoTrabalhandoService extends BaseService<AlunoTrabalhando, Path> {

  constructor(http: HttpClient) {
    super(http);
  }
}
