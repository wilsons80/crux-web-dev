import { Router } from '@angular/router';
import { AcessoService } from './../../../services/acesso/acesso.service';
import { Component, OnInit } from '@angular/core';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';

@Component({
  selector: 'app-escolher-unidade',
  templateUrl: './escolher-unidade.component.html',
  styleUrls: ['./escolher-unidade.component.css']
})
export class EscolherUnidadeComponent implements OnInit {

  unidades: any[];

  constructor(
    private unidadeService:UnidadeService,
    private router:Router
  ) { }

  ngOnInit() {
   this.unidadeService.getPorUsuario().subscribe((unidades:any[]) => {
     this.unidades = unidades;
   })
  }

  escolherUnidade(idUnidade:number){
    this.router.navigate([`home/${idUnidade}`]);
  }
     
}
