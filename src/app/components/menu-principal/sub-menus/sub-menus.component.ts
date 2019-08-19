import { Modulos } from './../../../core/modulos';
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModulosUsuarioService } from 'src/app/services/modulos/modulos-usuario.service';

@Component({
  selector: 'sub-menus',
  templateUrl: './sub-menus.component.html',
  styleUrls: ['./sub-menus.component.css'],
  animations: [
    trigger('mostrarSubMenu', [
      state('hidden', style({
        visibility: 'hidden',
        opacity: 0
      })),
      state('show',   style({
        visibility: 'visible',
        opacity: 1
      })),
      transition('*=>show', animate('500ms')),
    ])
  ]
})
export class SubMenusComponent implements OnInit {

  @Input() modulo: Modulos;
  @Input() currentState: String = "hidden";
  @Input() rootRouterLink: String = "/";


  constructor(private modulosUsuarioService:ModulosUsuarioService) { }

  isMostrarSubMenu: boolean = false;

  ngOnInit() {}
  

  possuiPermissaoCadastrar(){
   return true;
   // return this.modulosUsuarioService.acessoModulos[this.modulo].cadastra === 'S';
  }
  
  possuiPermissaoAlterar(){
    return true;
    //  return this.modulosUsuarioService.acessoModulos[this.modulo].altera === 'S';
  }
  
  possuiPermissaoDeletar(){
    return true;
    // return this.modulosUsuarioService.acessoModulos[this.modulo].deleta === 'S';
  }
  
  possuiPermissaoConsultar(){
    return true;
   // return this.modulosUsuarioService.acessoModulos[this.modulo].consulta === 'S';
  }

  getRouterLinkCadastrar(){
    return `${this.rootRouterLink}/cadastrar`;
  }
  getRouterLinkAlterar(){
    return `${this.rootRouterLink}/alterar`;
  }
  getRouterLinkDeletar(){
    return `${this.rootRouterLink}/deletar`;
  }
  getRouterLinkConsultar(){
    return `${this.rootRouterLink}/consultar`;
  }

}
