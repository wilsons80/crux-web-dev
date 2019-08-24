import { ToolbarPrincipalService } from './../../../services/toolbarPrincipal/toolbar-principal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Modulos } from 'src/app/core/modulos';

@Component({
  selector: 'menu-modulos',
  templateUrl: './menu-modulos.component.html',
  styleUrls: ['./menu-modulos.component.css']
})
export class MenuModulosComponent implements OnInit {

  @Input() modulo:Modulos;
  @Input() icone:String;
  @Input() titulo:String;
  @Input() pathRootRouter:String;

  currentState = "hidden";
  isMostrarSubMenu: boolean = false;
  
  constructor(
    private router:Router,
    private toolbarPrincipalService:ToolbarPrincipalService,
    private activatedRoute:ActivatedRoute
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

}
