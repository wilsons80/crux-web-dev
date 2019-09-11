import { CadastroAcesso } from '../../core/cadastro-acesso';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


const acessoRootPath = 'api/acesso/';
const menuRootPath = 'api/menu/';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  constructor(private http: HttpClient) { }
  
  getMenuPrincipal(idUnidade:number){
    return this.http.get(menuRootPath + `unidade/${idUnidade}`);
  }

  getPerfilAcessoDoUsuario(idUnidade:number, idUsuario:number|string, idModulo:number|string){
    if(idUsuario == undefined) idUsuario = "";
    if(idModulo == undefined) idModulo = "";

    return this.http.get(acessoRootPath + `perfil/unidade/${idUnidade}`, {params: {
       usuario: `${idUsuario}`,
       modulo: `${idModulo}`
    }});
  }

  cadastrarAcesso(cadastroAcesso:CadastroAcesso){
    return this.http.post(acessoRootPath , cadastroAcesso);
  }

  alterar(cadastroAcesso:CadastroAcesso){
    return this.http.put(acessoRootPath , cadastroAcesso);
  }
  
  excluir(idUsuarioGrupo:number){
    return this.http.delete(acessoRootPath + `${idUsuarioGrupo}`);
  }
  
}
