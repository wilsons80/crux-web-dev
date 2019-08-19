import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModulosUsuarioService {

  acessoModulos:any = {
    CADASTRO_CURSOS : {
      altera: 'S',
      consulta: 'S',
      deleta: 'S', 
      insere: 'S'
    },
    
  };

  constructor() { }

  ngOnInit(): void {
  }

}
