import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const usuarioRootPath = 'api/usuario/';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuariosPorUnidade(idUnidade:number){
    return this.http.get(usuarioRootPath + `unidade/${idUnidade}`);
  }

}

