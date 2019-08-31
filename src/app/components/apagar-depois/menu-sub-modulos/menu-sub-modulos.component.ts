import { Modulos } from './../../../core/modulos';
import { Component, OnInit, Input } from '@angular/core';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { MenuPrincipalService } from 'src/app/services/menuPrincipal/menu-principal.service';


@Component({
  selector: 'menu-sub-modulos',
  templateUrl: './menu-sub-modulos.component.html',
  styleUrls: ['./menu-sub-modulos.component.css']
})
export class MenuSubModulosComponent implements OnInit {

  @Input() modulo:Modulos;
  @Input() icone:String;
  @Input() titulo:String;
  @Input() pathRootRouter:String;

  currentState = "hidden";
  isMostrarSubMenu: boolean = false;
  
  constructor(
    private toolbarPrincipalService:ToolbarPrincipalService,
    private menuPrincipalService:MenuPrincipalService
    
    ) { }

  ngOnInit() {
  }

  
  getRouterLink(){
    let idUnidadeAtualSelecionada: number;
    if(this.toolbarPrincipalService.unidadeSelecionada){
      idUnidadeAtualSelecionada = this.toolbarPrincipalService.unidadeSelecionada.id;
    }
    return `${this.pathRootRouter}/${idUnidadeAtualSelecionada}/`;
  }

  fecharMenu(){
    this.menuPrincipalService.alternar();
  }

}
