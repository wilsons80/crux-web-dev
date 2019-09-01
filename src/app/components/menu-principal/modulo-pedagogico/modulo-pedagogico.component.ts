import { Component, OnInit } from '@angular/core';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';

@Component({
  selector: 'modulo-pedagogico',
  templateUrl: './modulo-pedagogico.component.html',
  styleUrls: ['./modulo-pedagogico.component.css']
})
export class ModuloPedagogicoComponent implements OnInit {

  constructor(
    private toolbarPrincipalService:ToolbarPrincipalService
  ) { }

  ngOnInit() {
  }

  goPage(){

  }


  getRouterLink(pathRootRouter){
    
    let idUnidadeAtualSelecionada: number;
    if(this.toolbarPrincipalService.unidadeSelecionada){
      idUnidadeAtualSelecionada = this.toolbarPrincipalService.unidadeSelecionada.id;
    }
    return `${pathRootRouter}/${idUnidadeAtualSelecionada}`;
  }

}
