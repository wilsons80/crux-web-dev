import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Unidade } from 'src/app/core/unidade';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema/usuario-sistema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { UsuarioUnidadeService } from 'src/app/services/usuario-unidade/usuario-unidade.service';
import { ProjetoUnidade } from 'src/app/core/projeto-unidade';

@Component({
  selector: 'unidades-projeto',
  templateUrl: './unidades-projeto.component.html',
  styleUrls: ['./unidades-projeto.component.css']
})
export class UnidadesProjetoComponent implements OnInit {

  @Input() projetoUnidades: ProjetoUnidade[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['siglaUnidade', 'nomeUnidade', 'cnpj', 'dataInicio', 'dataFim', 'acoes'];
  dataSource: MatTableDataSource<ProjetoUnidade> = new MatTableDataSource();

  openFormCadastro = true;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  unidadesComboCadastro: any[];
  projetoUnidade: ProjetoUnidade = new ProjetoUnidade();

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private usuarioUnidadeService: UsuarioUnidadeService,
  ) { }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }
    this.limpar();



    this.dataSource.paginator = this.paginator;
    this.carregarLista();

    this.usuarioUnidadeService.getUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: any[]) => {
      this.unidadesComboCadastro = unidades;
    });

  }

  limpar() {
    this.projetoUnidade = new ProjetoUnidade();
  }


  mostrarBotaoLimpar() {
    if (this.isAtualizar) { return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }


  isUnidadeJaAdicionada(): boolean {
    const unidadeAdicionada = this.projetoUnidades.find((u: ProjetoUnidade) => u.unidade.idUnidade === this.projetoUnidade.unidade.idUnidade);

    return !!unidadeAdicionada;

  }

  adicionar() {

    if (this.isUnidadeJaAdicionada()) {
      this.toastService.showAlerta('Unidade já adicionada');
      return;
    }

    const projetoUnidade:ProjetoUnidade = new ProjetoUnidade();
    Object.assign(projetoUnidade, this.projetoUnidade);


    this.projetoUnidades.push(projetoUnidade);
    this.limpar();
  }

  deletar(projetoUnidade: ProjetoUnidade): void {
    const index = this.projetoUnidades.indexOf( this.projetoUnidades.find((pu:ProjetoUnidade) => pu === projetoUnidade));
    if (index >= 0) {
      this.projetoUnidades.splice(index, 1);
      this.carregarLista();
    }
  }

  novo() {
     this.openFormCadastro = !this.openFormCadastro;
     this.limpar();
  }

  carregarLista() {
    if (this.projetoUnidades.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma unidade adicionada.';
    } else {
      this.dataSource.data = this.projetoUnidades ? this.projetoUnidades : [];
      this.mostrarTabela = true;
    }
  }
}
