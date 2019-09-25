import { ToastService } from './../../../services/toast/toast.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Indicadores } from 'src/app/core/indicadores';
import { Objetivo } from 'src/app/core/objetivo';
import { IndicadoresService } from 'src/app/services/indicadores/indicadores.service';
import { ObjetivoService } from 'src/app/services/objetivo/objetivo.service';

@Component({
  selector: 'app-cadastrar-indicadores',
  templateUrl: './cadastrar-indicadores.component.html',
  styleUrls: ['./cadastrar-indicadores.component.css']
})
export class CadastrarIndicadoresComponent implements OnInit {

  objetivos: Objetivo[];
  indicadores: Indicadores = new Indicadores();

  isAtualizar: boolean = false;

  constructor(
    private indicadoresService: IndicadoresService,
    private objetivoService: ObjetivoService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) {
    this.indicadores.objetivo = new Objetivo();
  }


  ngOnInit() {
    this.objetivoService.getAll().subscribe((objetivos: Objetivo[]) => {
      this.objetivos = objetivos;
    });

    let idIndicadores: number;
    idIndicadores = this.route.snapshot.queryParams.idIndicador ? this.route.snapshot.queryParams.idIndicador : null;
    if (idIndicadores) {
      this.isAtualizar = true;
      this.indicadoresService.getById(idIndicadores).subscribe((ind: Indicadores) => {
        this.indicadores = ind;
      });
    }

  }
  cadastrar() {
    this.indicadoresService.cadastrar(this.indicadores).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Indicador cadastrado com sucesso");
    });
  }

  limpar() {
    this.indicadores = new Indicadores()
  }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.indicadoresService.alterar(this.indicadores).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Indicador atualizado com sucesso");
    });

  }

}
