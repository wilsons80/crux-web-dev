import { Perspectiva } from 'src/app/core/perspectiva';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Objetivo } from 'src/app/core/objetivo';
import { PerspectivaService } from 'src/app/services/perspectiva/perspectiva.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Unidade } from 'src/app/core/unidade';
import { Departamento } from 'src/app/core/departamento';
import { ObjetivoService } from 'src/app/services/objetivo/objetivo.service';

@Component({
  selector: 'app-cadastrar-objetivo',
  templateUrl: './cadastrar-objetivo.component.html',
  styleUrls: ['./cadastrar-objetivo.component.css']
})
export class CadastrarObjetivoComponent implements OnInit {

  perspectivas: Perspectiva[];
  objetivo: Objetivo = new Objetivo();

  isAtualizar: boolean = false;

  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private perspectivaService: PerspectivaService,
    private objetivoService: ObjetivoService,
    private router: Router,
    private route: ActivatedRoute,
    private location:Location,
  ) { }


  ngOnInit() {
    this.perspectivaService.getAll().subscribe((perspectivas: Perspectiva[]) => {
      this.perspectivas = perspectivas;
    })

    let idObjetivo: number;
    idObjetivo = this.route.snapshot.queryParams.idObjetivo ? this.route.snapshot.queryParams.idObjetivo : null;
    if (idObjetivo) {
      this.isAtualizar = true;
      this.objetivoService.getById(idObjetivo).subscribe((objetivo: Objetivo) => {
        this.objetivo = objetivo
      });
    }
    
  }
  cadastrar() {

    this.objetivoService.cadastrar(this.objetivo).subscribe(() => {
      this.location.back();
    });
  }

  limpar() { }

  cancelar() { 
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar(){
    this.objetivoService.alterar(this.objetivo).subscribe(()=>{
      this.location.back();
    });
    
  }

}
