import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atividade } from 'src/app/core/atividade';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService extends BaseService<Atividade> {

    constructor(http: HttpClient) {
      super(http, Rotas.ATIVIDADE);
    }
}
