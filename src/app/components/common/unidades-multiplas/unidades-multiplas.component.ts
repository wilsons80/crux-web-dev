import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Unidade } from 'src/app/core/unidade';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UsuariosUnidades } from 'src/app/core/usuarios-unidades';
import { Acesso } from 'src/app/core/acesso';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema/usuario-sistema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { UsuarioUnidadeService } from 'src/app/services/usuario-unidade/usuario-unidade.service';
import { UsuarioSistema } from 'src/app/core/usuario-sistema';

@Component({
  selector: 'unidades-multiplas',
  templateUrl: './unidades-multiplas.component.html',
  styleUrls: ['./unidades-multiplas.component.css']
})
export class UnidadesMultiplasComponent implements OnInit {

  @Input() unidades: Unidade[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['siglaUnidade', 'nomeUnidade', 'nomeFantasia', 'cnpj', 'acoes'];
  dataSource: MatTableDataSource<Unidade> = new MatTableDataSource();

  openFormCadastro = true;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  unidadesComboCadastro: any[];
  unidade: Unidade = new Unidade();

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
    this.unidade = new Unidade();
  }


  mostrarBotaoLimpar() {
    if (this.isAtualizar) { return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }


  isUnidadeJaAdicionada(): boolean {
    const unidadeAdicionada = this.unidades.find((u: Unidade) => u.idUnidade === this.unidade.idUnidade);

    return !!unidadeAdicionada;

  }

  adicionar() {

    if (this.isUnidadeJaAdicionada()) {
      this.toastService.showAlerta('Unidade já adicionada');
      return;
    }

    const unidadeAdicionada = new Unidade();
    Object.assign(unidadeAdicionada, this.unidade);


    this.unidades.push(unidadeAdicionada);
    this.limpar();
  }

  deletar(unidade: Unidade): void {
    const index = this.unidades.indexOf( this.unidades.find(uni => uni === unidade));
    if (index >= 0) {
      this.unidades.splice(index, 1);
      this.carregarLista();
    }
  }

  novo() {
     this.openFormCadastro = !this.openFormCadastro;
     this.limpar();
  }

  carregarLista() {
    if (this.unidades.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma unidade adicionada.';
    } else {
      this.dataSource.data = this.unidades ? this.unidades : [];
      this.mostrarTabela = true;
    }
  }

}
