import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ParticipanteAtendimento } from 'src/app/core/participante-atendimento';

interface Path {
  rootPath: 'api/participanteatendimento/';
}

@Injectable({
  providedIn: 'root'
})
export class ParticipantesAtendimentosService extends BaseService<ParticipanteAtendimento, Path> {

  constructor(http: HttpClient) {
    super(http);
  }
  
}
