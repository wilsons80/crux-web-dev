import { Injectable } from '@angular/core';
import { Modulos } from 'src/app/core/modulos';

@Injectable({
  providedIn: 'root'
})
export class ControleMenuService {


  logo: any;

  acessos: any = [];

  constructor() { }

  verificaAcessoModulo(tipoModulo: Modulos) {
    if (this.acessos) {
      let acesso = this.acessos.find(a => a.nomeModuloFilho === tipoModulo)
      return acesso ? true : false
    }

  }

}
