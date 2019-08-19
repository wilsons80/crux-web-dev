import { ControleMenuService } from './../../../services/controle-menu/controle-menu.service';
import { Modulos } from './../../../core/modulos';
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

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


  constructor(private controleMenuService:ControleMenuService) { }

  isMostrarSubMenu: boolean = false;

  ngOnInit() {}
  

  possuiPermissaoCadastrar(){
    return this.controleMenuService.acessoModulos[this.modulo].insere === 'S';
  }
  
  possuiPermissaoAlterar(){
    return this.controleMenuService.acessoModulos[this.modulo].altera === 'S';
  }
  
  possuiPermissaoDeletar(){
    return this.controleMenuService.acessoModulos[this.modulo].deleta === 'S';
  }
  
  possuiPermissaoConsultar(){
    return this.controleMenuService.acessoModulos[this.modulo].consulta === 'S';
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
