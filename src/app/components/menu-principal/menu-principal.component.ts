import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Modulos } from './../../core/modulos';
import { ControleMenuService } from './../../services/controle-menu/controle-menu.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuPrincipalService } from 'src/app/services/menuPrincipal/menu-principal.service';
import { MatButton } from '@angular/material';


@Component({
  selector: 'menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild('botao', { static: true }) botao:MatButton;

    enumModulos = Modulos;

    visivel = false;

  constructor(
    private controleMenuService:ControleMenuService,
    private toolbarPrincipalService:ToolbarPrincipalService,
    public menuPrincipalService:MenuPrincipalService,
    ) { }


  ngOnInit() {
    this.menuPrincipalService.toggle.subscribe(() =>this.visivel = !this.visivel );
    
  }
  
 
  fecharMenu(){
    this.visivel = !this.visivel;
  }
  getBackground(){
    if(this.toolbarPrincipalService && this.toolbarPrincipalService.logo){
      return `url(${this.toolbarPrincipalService.logo})`
    }
  }

  verificaAcesso(modulo:Modulos) {
    return this.controleMenuService.verificaAcessoModulo(modulo);
  }

  getModulos() {
    return Modulos;
  }

  naoPossuiFoto(){
  //  return "data:image/jpg;base64," === this.toolbarPrincipalService.logo 
      return true;
    }
  
}
