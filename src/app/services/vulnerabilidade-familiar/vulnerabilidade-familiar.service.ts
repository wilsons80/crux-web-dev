import { VulnerabilidadesFamiliar } from './../../core/vulnerabilidades-familiar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

const rootPath = 'api/vulnerabilidadesfamiliar/';

@Injectable({
  providedIn: 'root'
})
export class VulnerabilidadeFamiliarService extends BaseService<VulnerabilidadesFamiliar> {

  constructor(http: HttpClient) {
    super(http, rootPath);
  }

}
