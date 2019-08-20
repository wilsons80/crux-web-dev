import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Modulos } from 'src/app/core/modulos';

@Injectable({
  providedIn: 'root'
})
export class ControleMenuService {

  mostrarModuloAlunos = false;
  mostrarModuloCursos = false;
  mostrarModuloUnidades = false;

  acessoModulos:any = {
    ALUNOS : {
      mostrarMenu: false,
      altera: 'N',
      consulta: 'N',
      deleta: 'N', 
      insere: 'N'
    },
    CURSOS : {
      mostrarMenu: false,
      altera: 'N',
      consulta: 'N',
      deleta: 'N', 
      insere: 'N'
    },
    UNIDADES : {
      mostrarMenu: false,
      altera: 'N',
      consulta: 'N',
      deleta: 'N', 
      insere: 'N'
    },
    ACESSOS : {
      mostrarMenu: false,
      altera: 'S',
      consulta: 'S',
      deleta: 'S', 
      insere: 'S'
    },
  };

  constructor() { }

  setAcessos(acessos){
    this.verificaAcessoModulo(acessos,Modulos.ALUNOS);
    this.verificaAcessoModulo(acessos,Modulos.CURSOS);
    this.verificaAcessoModulo(acessos,Modulos.UNIDADES);
    this.verificaAcessoModulo(acessos,Modulos.ACESSOS);
  }

  verificaAcessoModulo(acessos:any, tipoModulo:Modulos){
    let modulo = _.filter(acessos, acesso => acesso.modulo === tipoModulo);
    if(modulo.length > 0){
     this.acessoModulos[tipoModulo].mostrarMenu = true;
     this.acessoModulos[tipoModulo].altera = modulo[0].altera;
     this.acessoModulos[tipoModulo].consulta = modulo[0].consulta;
     this.acessoModulos[tipoModulo].deleta = modulo[0].deleta;
     this.acessoModulos[tipoModulo].insere = modulo[0].insere;
    }
  }


}
