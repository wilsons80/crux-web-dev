import { Departamento } from './../../core/departamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends BaseService<Departamento, Rotas.ROTA_DEPARTAMENTO> {

  constructor(http: HttpClient) {
    super(http);
  }
  
}
