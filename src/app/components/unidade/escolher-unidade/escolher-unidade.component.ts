import { AcessoService } from './../../../services/acesso/acesso.service';
import { Component, OnInit } from '@angular/core';
import { UnidadesUsuarioService } from 'src/app/services/unidades-usuario/unidades-usuario.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';

@Component({
  selector: 'app-escolher-unidade',
  templateUrl: './escolher-unidade.component.html',
  styleUrls: ['./escolher-unidade.component.css']
})
export class EscolherUnidadeComponent implements OnInit {

  unidades: any[];

  constructor(
    private acessoService:AcessoService,
    private unidadeService:UnidadeService,
  ) { }

  ngOnInit() {
   this.unidadeService.getPorUsuario(3).subscribe((unidades:any[]) => {
     this.unidades = unidades;
   })
  }

  getAllAcessos(idUnidade){
    this.acessoService.getAllAcessos(idUnidade).subscribe(acessos => {
      console.log(acessos);
    });
  }
     
}
