import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iniciativa } from 'src/app/core/iniciativa';
import { PlanosAcaoService } from 'src/app/services/planosAcao/planos-acao.service';
import { PlanosAcao } from './../../../core/planos-acao';
import { IniciativaService } from './../../../services/iniciativa/iniciativa.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-cadastrar-planos-acao',
  templateUrl: './cadastrar-planos-acao.component.html',
  styleUrls: ['./cadastrar-planos-acao.component.css']
})
export class CadastrarPlanosAcaoComponent implements OnInit {

  iniciativas: Iniciativa[];
  planosAcao: PlanosAcao = new PlanosAcao();

  isAtualizar: boolean = false;

  constructor(
    private iniciativaService: IniciativaService,
    private planosAcaoService: PlanosAcaoService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) {
    this.planosAcao.iniciativa = new Iniciativa();
  }


  ngOnInit() {
    this.iniciativaService.getAll().subscribe((iniciativas: Iniciativa[]) => {
      this.iniciativas = iniciativas;
    })

    let idPlanosAcao: number;
    idPlanosAcao = this.route.snapshot.queryParams.idPlanosAcao ? this.route.snapshot.queryParams.idPlanosAcao : null;
    if (idPlanosAcao) {
      this.isAtualizar = true;
      this.planosAcaoService.getById(idPlanosAcao).subscribe((planosAcao: PlanosAcao) => {
        this.planosAcao = planosAcao
      });
    }

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

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.planosAcaoService.alterar(this.planosAcao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Plano de ação atualizado com sucesso");
    });

  }

}
