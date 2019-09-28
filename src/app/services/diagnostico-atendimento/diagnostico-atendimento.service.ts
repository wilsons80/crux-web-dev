import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diagnostico } from 'src/app/core/diagnostico';
import { BaseService } from '../base/base.service';

interface Path {
  rootPath: 'api/diagnosticos/';
}

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoAtendimentoService extends BaseService<Diagnostico, Path> {

  constructor(http: HttpClient) {
    super(http);
  }

}
