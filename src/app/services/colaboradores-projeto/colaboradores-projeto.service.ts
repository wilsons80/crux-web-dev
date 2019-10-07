import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColaboradoresProjeto } from 'src/app/core/colaboradores-projeto';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';


@Injectable({
  providedIn: 'root'
})
export class ColaboradoresProjetoService extends BaseService<ColaboradoresProjeto> {

  constructor(http: HttpClient) {
    super(http, Rotas.COLABORADORES_PROJETO);
  }

}
