import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SituacoesVulnerabilidade } from 'src/app/core/situacoes-vulnerabilidade';
import { BaseService } from '../base/base.service';

interface Path {
  rootPath: 'api/situacoesvulnerabilidade/';
}

@Injectable({
  providedIn: 'root'
})
export class SituacaoVulnerabilidadeService extends BaseService<SituacoesVulnerabilidade, Path> {

  constructor(http: HttpClient) {
    super(http);
  }

}
