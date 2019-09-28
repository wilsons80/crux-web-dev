import { VulnerabilidadesFamiliar } from './../../core/vulnerabilidades-familiar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

interface Path {
  rootPath: 'api/vulnerabilidadesfamiliar/';
}

@Injectable({
  providedIn: 'root'
})
export class VulnerabilidadeFamiliarService extends BaseService<VulnerabilidadesFamiliar, Path> {

  constructor(http: HttpClient) {
    super(http);
  }

}
