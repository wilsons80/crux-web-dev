import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GrausInstrucao } from 'src/app/core/graus-instrucao';
import { GrausInstrucaoService } from 'src/app/services/graus-instrucao/graus-instrucao.service';
import { ObjetivoService } from 'src/app/services/objetivo/objetivo.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Objetivo } from 'src/app/core/objetivo';

@Component({
  selector: 'app-cadastrar-graus-instrucao',
  templateUrl: './cadastrar-graus-instrucao.component.html',
  styleUrls: ['./cadastrar-graus-instrucao.component.css']
})
export class CadastrarGrausInstrucaoComponent implements OnInit {

  grausInstrucao: GrausInstrucao = new GrausInstrucao();

  isAtualizar: boolean = false;

  constructor(
    private grausInstrucaoService: GrausInstrucaoService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) {
  }


  ngOnInit() {

    let idGrausInstrucao: number;
    idGrausInstrucao = this.route.snapshot.queryParams.idGrausInstrucao ? this.route.snapshot.queryParams.idGrausInstrucao : null;
    if (idGrausInstrucao) {
      this.isAtualizar = true;
      this.grausInstrucaoService.getById(idGrausInstrucao).subscribe((grausInstrucao: GrausInstrucao) => {
        this.grausInstrucao = grausInstrucao;
      });
    }

  }
  cadastrar() {
    this.grausInstrucaoService.cadastrar(this.grausInstrucao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Grau de Instrução cadastrado com sucesso");
    });
  }

  limpar() {
    this.grausInstrucao = new GrausInstrucao()
  }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.grausInstrucaoService.alterar(this.grausInstrucao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Grau de Instrução atualizado com sucesso");
    });

  }

}
