import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atividade } from 'src/app/core/atividade';
import { BaseService } from '../base/base.service';

interface Path {
  rootPath: 'api/atividade/';
}

@Injectable({
  providedIn: 'root'
})
export class AtividadeService extends BaseService<Atividade, Path> {

    constructor(http: HttpClient) {
      super(http);
    }
}
