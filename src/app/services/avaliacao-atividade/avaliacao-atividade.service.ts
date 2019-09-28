import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Avaliacao } from 'src/app/core/avaliacao';

interface Path {
  rootPath: 'api/avaliacoes/';
}

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoAtividadeService extends BaseService<Avaliacao, Path> {

  constructor(http: HttpClient) {
    super(http);
  }
}
