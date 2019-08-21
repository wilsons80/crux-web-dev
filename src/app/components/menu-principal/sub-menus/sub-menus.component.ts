import { ToolbarPrincipalService } from './../../../services/toolbarPrincipal/toolbar-principal.service';
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
  @Input() pathRootRouter:String;


  constructor(
    private controleMenuService:ControleMenuService,
    private toolbarPrincipalService:ToolbarPrincipalService
    ) { }

  isMostrarSubMenu: boolean = false;

  ngOnInit() {}
  

  possuiPermissao(acao){
    return this.controleMenuService.acessoModulos[this.modulo][acao] === 'S';
  }
  
  getRouterLink(acao){
    let idUnidadeAtualSelecionada: number;
    if(this.toolbarPrincipalService.unidadeSelecionada){
      idUnidadeAtualSelecionada = this.toolbarPrincipalService.unidadeSelecionada.id;
    }
    return `${this.pathRootRouter}/${idUnidadeAtualSelecionada}/${acao}`;
  }
  

}
