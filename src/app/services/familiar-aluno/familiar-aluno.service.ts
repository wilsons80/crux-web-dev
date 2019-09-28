import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Familiares } from 'src/app/core/familiares';
import { BaseService } from '../base/base.service';


const rootPath = 'api/familiares/';

@Injectable({
  providedIn: 'root'
})
export class FamiliarAlunoService extends BaseService<Familiares> {

  constructor(http: HttpClient) {
    super(http, rootPath);
  }

}
