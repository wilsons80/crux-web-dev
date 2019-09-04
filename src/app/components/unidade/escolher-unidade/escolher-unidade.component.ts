import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { Unidade } from 'src/app/core/unidade';

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
    this.unidadeService.getUnidadePorId(idUnidade).subscribe((unidade:Unidade) => {
      this.router.navigate([`home`]);
    })
  }
     
}
