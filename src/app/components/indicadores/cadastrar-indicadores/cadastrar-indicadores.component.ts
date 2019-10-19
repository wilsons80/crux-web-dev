import { ToastService } from './../../../services/toast/toast.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Indicadores } from 'src/app/core/indicadores';
import { Objetivo } from 'src/app/core/objetivo';
import { IndicadoresService } from 'src/app/services/indicadores/indicadores.service';
import { ObjetivoService } from 'src/app/services/objetivo/objetivo.service';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'app-cadastrar-indicadores',
  templateUrl: './cadastrar-indicadores.component.html',
  styleUrls: ['./cadastrar-indicadores.component.css']
})
export class CadastrarIndicadoresComponent implements OnInit {

  objetivos: Objetivo[];
  indicadores: Indicadores = new Indicadores();

  isAtualizar: boolean = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private indicadoresService: IndicadoresService,
    private objetivoService: ObjetivoService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) {
    this.indicadores.objetivo = new Objetivo();
  }


  ngOnInit() {

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    this.objetivoService.getAll().subscribe((objetivos: Objetivo[]) => {
      this.objetivos = objetivos;
    });

    let idIndicadores: number;
    idIndicadores = this.activatedRoute.snapshot.queryParams.idIndicador ? this.activatedRoute.snapshot.queryParams.idIndicador : null;
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



  atualizar() {
    this.indicadoresService.alterar(this.indicadores).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Indicador atualizado com sucesso");
    });

  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}
