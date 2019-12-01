import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from '../base/base.service';
import { ColaboradoresPrograma } from 'src/app/core/colaboradores-programa';


@Injectable({
  providedIn: 'root'
})
export class ColaboradoresProgramaService extends BaseService<ColaboradoresPrograma> {

  constructor(http: HttpClient) {
    super(http, Rotas.COLABORADORES_PROGRAMA);
  }
 
}
