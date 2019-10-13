import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iniciativa } from 'src/app/core/iniciativa';
import { PlanosAcaoService } from 'src/app/services/planosAcao/planos-acao.service';
import { PlanosAcao } from './../../../core/planos-acao';
import { IniciativaService } from './../../../services/iniciativa/iniciativa.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-cadastrar-planos-acao',
  templateUrl: './cadastrar-planos-acao.component.html',
  styleUrls: ['./cadastrar-planos-acao.component.css']
})
export class CadastrarPlanosAcaoComponent implements OnInit {

  iniciativas: Iniciativa[];
  planosAcao: PlanosAcao = new PlanosAcao();

  isAtualizar: boolean = false;

  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private iniciativaService: IniciativaService,
    private planosAcaoService: PlanosAcaoService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) {
    this.planosAcao.iniciativa = new Iniciativa();
  }


  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(this.perfilAcesso.insere === 'N'){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(this.perfilAcesso.altera === 'N'){
      this.mostrarBotaoAtualizar = false;
    }
    this.iniciativaService.getAll().subscribe((iniciativas: Iniciativa[]) => {
      this.iniciativas = iniciativas;
    })

    let idPlanosAcao: number;
    idPlanosAcao = this.activatedRoute.snapshot.queryParams.idPlanosAcao ? this.activatedRoute.snapshot.queryParams.idPlanosAcao : null;
    if (idPlanosAcao) {
      this.isAtualizar = true;
      this.planosAcaoService.getById(idPlanosAcao).subscribe((planosAcao: PlanosAcao) => {
        this.planosAcao = planosAcao
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
    this.planosAcaoService.cadastrar(this.planosAcao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Plano de ação cadastrado com sucesso");
    });
  }

  limpar() {
    this.planosAcao = new PlanosAcao();
  }

  cancelar() {
    this.location.back();
  }


  atualizar() {
    this.planosAcaoService.alterar(this.planosAcao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Plano de ação atualizado com sucesso");
    });

  }

}
