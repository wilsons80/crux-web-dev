import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const enderecoRootPath = 'api/endereco/';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  getAllEstados() {
    return this.http.get(enderecoRootPath + `estados`);
  }
}
