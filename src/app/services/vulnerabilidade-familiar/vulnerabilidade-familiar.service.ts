import { VulnerabilidadesFamiliar } from './../../core/vulnerabilidades-familiar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';

@Injectable({
  providedIn: 'root'
})
export class VulnerabilidadeFamiliarService extends BaseService<VulnerabilidadesFamiliar> {

  constructor(http: HttpClient) {
    super(http, Rotas.VULNERABILIDADE_FAMILIAR);
  }

}
