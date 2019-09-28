import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Atendimento } from 'src/app/core/atendimento';

interface Path {
  rootPath: 'api/atendimento/';
}

@Injectable({
  providedIn: 'root'
})
export class AtendimentosService extends BaseService<Atendimento, Path> {

  constructor(http: HttpClient) {
    super(http);
  }
}
