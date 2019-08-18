import { Component, OnInit } from '@angular/core';
import { UnidadesUsuarioService } from 'src/app/services/unidades-usuario/unidades-usuario.service';

@Component({
  selector: 'app-escolher-unidade',
  templateUrl: './escolher-unidade.component.html',
  styleUrls: ['./escolher-unidade.component.css']
})
export class EscolherUnidadeComponent implements OnInit {

  unidades: any[];

  constructor(
    private unidadesUsuarioService:UnidadesUsuarioService
  ) { }

  ngOnInit() {
    this.unidades = this.unidadesUsuarioService.getObjeto(); 
  }

}
