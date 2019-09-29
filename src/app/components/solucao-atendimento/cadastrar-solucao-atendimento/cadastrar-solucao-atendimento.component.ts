import { Component, OnInit } from '@angular/core';
import { Solucoes } from 'src/app/core/solucoes';
import { SolucaoAtendimentoService } from 'src/app/services/solucao-atendimento/solucao-atendimento.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-cadastrar-solucao-atendimento',
  templateUrl: './cadastrar-solucao-atendimento.component.html',
  styleUrls: ['./cadastrar-solucao-atendimento.component.css']
})
export class CadastrarSolucaoAtendimentoComponent implements OnInit {

  solucao: Solucoes = new Solucoes();
  isAtualizar = false;

  constructor(
    private solucaoService: SolucaoAtendimentoService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) { }


  ngOnInit() {
    let id: number;
    id = this.route.snapshot.queryParams.id ? this.route.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.solucaoService.getById(id).subscribe((retorno: Solucoes) => {
        this.solucao = retorno;
      });
    }
  }

  cadastrar() {
    this.solucaoService.cadastrar(this.solucao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Solução de atendimento cadastrada com sucesso');
    });
  }

  limpar() {
    this.solucao = new Solucoes();
   }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.solucaoService.alterar(this.solucao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Solução de atendimento atualizada com sucesso');
    });
  }
}
