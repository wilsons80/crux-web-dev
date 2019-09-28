import { Solucoes } from './../../core/solucoes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

const rootPath = 'api/solucoes/';

@Injectable({
  providedIn: 'root'
})
export class SolucaoAtendimentoService  extends BaseService<Solucoes> {

  constructor(http: HttpClient) {
    super(http, rootPath);
  }

}
