import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Familiares } from 'src/app/core/familiares';
import { BaseService } from '../base/base.service';


interface Path {
  rootPath: 'api/familiares/';
}

@Injectable({
  providedIn: 'root'
})
export class FamiliarAlunoService extends BaseService<Familiares, Path> {

  constructor(http: HttpClient) {
    super(http);
  }

}
