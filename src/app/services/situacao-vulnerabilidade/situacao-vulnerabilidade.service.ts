import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SituacoesVulnerabilidade } from 'src/app/core/situacoes-vulnerabilidade';
import { BaseService } from '../base/base.service';

const rootPath = 'api/situacoesvulnerabilidade/';

@Injectable({
  providedIn: 'root'
})
export class SituacaoVulnerabilidadeService extends BaseService<SituacoesVulnerabilidade> {

  constructor(http: HttpClient) {
    super(http, rootPath);
  }

}
