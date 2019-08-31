import { Component, OnInit } from '@angular/core';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';

@Component({
  selector: 'sub-menu-unidade',
  templateUrl: './sub-menu-unidade.component.html',
  styleUrls: ['./sub-menu-unidade.component.css']
})
export class SubMenuUnidadeComponent implements OnInit {

  constructor(

    private toolbarPrincipalService:ToolbarPrincipalService

  ) { }

  ngOnInit() {
  }

  getRouterLink(){
    let idUnidadeAtualSelecionada: number;
    if(this.toolbarPrincipalService.unidadeSelecionada){
      idUnidadeAtualSelecionada = this.toolbarPrincipalService.unidadeSelecionada.id;
    }
    return `unidade/4/`;
  }

}
