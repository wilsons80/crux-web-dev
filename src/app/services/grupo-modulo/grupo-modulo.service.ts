import { Rotas } from './../../core/rotas';
import { GrupoModulo } from './../../core/grupo-modulo';
import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrupoModuloService extends BaseService<GrupoModulo> {

  constructor(http: HttpClient) {
    super(http, Rotas.GRUPO_MODULO);
  }

  getAllByUnidade(idUnidade: number) {
    return this.http.get(`${Rotas.GRUPO_MODULO}unidade/${idUnidade}`);
  }


  getAllByUnidadeAndModulo(idUnidade: number|string, idModulo: number|string) {
    if (!idUnidade) { idUnidade = ''; }
    if (!idModulo) { idModulo = ''; }

    return this.http.get(`${Rotas.GRUPO_MODULO}unidade`, {params: {
       idunidade: `${idUnidade}`,
       idmodulo: `${idModulo}`
    }});
  }
}
