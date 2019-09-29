import { Component, OnInit } from '@angular/core';
import { SituacoesVulnerabilidade } from 'src/app/core/situacoes-vulnerabilidade';
import { SituacaoVulnerabilidadeService } from 'src/app/services/situacao-vulnerabilidade/situacao-vulnerabilidade.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-situacao-vulnerabilidade',
  templateUrl: './cadastrar-situacao-vulnerabilidade.component.html',
  styleUrls: ['./cadastrar-situacao-vulnerabilidade.component.css']
})
export class CadastrarSituacaoVulnerabilidadeComponent implements OnInit {

  situacao: SituacoesVulnerabilidade = new SituacoesVulnerabilidade();
  isAtualizar = false;

  constructor(
    private situacaoService: SituacaoVulnerabilidadeService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) { }


  ngOnInit() {
    let idSituacao: number;
    idSituacao = this.route.snapshot.queryParams.idSituacao ? this.route.snapshot.queryParams.idSituacao : null;
    if (idSituacao) {
      this.isAtualizar = true;
      this.situacaoService.getById(idSituacao).subscribe((situacao: SituacoesVulnerabilidade) => {
        this.situacao = situacao;
      });
    }
  }

  cadastrar() {
    this.situacaoService.cadastrar(this.situacao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Situação de Vulnerabilidade cadastrada com sucesso');
    });
  }

  limpar() {
    this.situacao = new SituacoesVulnerabilidade();
   }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.situacaoService.alterar(this.situacao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Situação de Vulnerabilidade atualizada com sucesso');
    });
  }

}
