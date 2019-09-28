import { Solucoes } from './../../core/solucoes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

interface Path {
  rootPath: 'api/solucoes/';
}

@Injectable({
  providedIn: 'root'
})
export class SolucaoAtendimentoService  extends BaseService<Solucoes, Path> {

  constructor(http: HttpClient) {
    super(http);
  }

}
