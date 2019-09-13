import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Modulos } from './../../core/modulos';
import { ControleMenuService } from './../../services/controle-menu/controle-menu.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuPrincipalService } from 'src/app/services/menuPrincipal/menu-principal.service';


@Component({
  selector: 'menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

    enumModulos = Modulos;

  constructor(
    private controleMenuService:ControleMenuService,
    private menuPrincipalService:MenuPrincipalService,
    ) { }


  ngOnInit() {
    
  }
  
  mostrarMenu(modulo){
    return this.controleMenuService.acessoModulos[modulo].mostrarMenu;
  }

  fecharMenu(){
    this.menuPrincipalService.alternar();
  }

}
