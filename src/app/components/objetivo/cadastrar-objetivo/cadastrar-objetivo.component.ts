import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Objetivo } from 'src/app/core/objetivo';
import { Perspectiva } from 'src/app/core/perspectiva';
import { ObjetivoService } from 'src/app/services/objetivo/objetivo.service';
import { PerspectivaService } from 'src/app/services/perspectiva/perspectiva.service';
import { ToastService } from './../../../services/toast/toast.service';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-cadastrar-objetivo',
  templateUrl: './cadastrar-objetivo.component.html',
  styleUrls: ['./cadastrar-objetivo.component.css']
})
export class CadastrarObjetivoComponent implements OnInit {

  perspectivas: Perspectiva[];
  objetivo: Objetivo = new Objetivo();

  isAtualizar: boolean = false;

  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;


  constructor(
    private perspectivaService: PerspectivaService,
    private objetivoService: ObjetivoService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) {
    this.objetivo.perspectiva = new Perspectiva();
  }


  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(this.perfilAcesso.insere === 'N'){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(this.perfilAcesso.altera === 'N'){
      this.mostrarBotaoAtualizar = false;
    }
    this.perspectivaService.getAll().subscribe((perspectivas: Perspectiva[]) => {
      this.perspectivas = perspectivas;
    })

    let idObjetivo: number;
    idObjetivo = this.activatedRoute.snapshot.queryParams.idObjetivo ? this.activatedRoute.snapshot.queryParams.idObjetivo : null;
    if (idObjetivo) {
      this.isAtualizar = true;
      this.objetivoService.getById(idObjetivo).subscribe((objetivo: Objetivo) => {
        this.objetivo = objetivo
      });
    }

  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {

    this.objetivoService.cadastrar(this.objetivo).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Objetivo cadastrado com sucesso");
    });
  }

  limpar() {
    this.objetivo = new Objetivo();
  }

  cancelar() {
    this.location.back();
  }


  atualizar() {
    this.objetivoService.alterar(this.objetivo).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Objetivo atualizado com sucesso");
    });

  }

}
