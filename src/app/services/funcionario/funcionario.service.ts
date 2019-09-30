import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rotas } from 'src/app/core/rotas';
import { BaseService } from './../../../../.history/src/app/services/base/base.service_20190930175311';
import { Funcionario } from './../../core/funcionario';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends BaseService<Funcionario> {
  constructor(http: HttpClient) {
    super(http, Rotas.FUNCIONARIOS);
  }
}

