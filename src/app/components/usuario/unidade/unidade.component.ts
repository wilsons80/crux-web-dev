import { Unidade } from './../../../core/unidade';
import { UnidadeService } from './../../../services/unidade/unidade.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UsuarioSistema } from 'src/app/core/usuario-sistema';
import { Acesso } from 'src/app/core/acesso';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema/usuario-sistema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css']
})
export class UnidadeComponent implements OnInit {

  @Input() usuarioSistema: UsuarioSistema;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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

  unidades: Unidade[];
  unidade: Unidade = new Unidade();

  constructor(private usuarioSistemaService: UsuarioSistemaService,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastService,
              private unidadeService: UnidadeService,
              private router: Router,
  ) { }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }
    this.limpar();



    this.dataSource.paginator = this.paginator;
    this.carregarLista();

    this.unidadeService.getUnidadesComAcesso().subscribe((unidades: any[]) => {
      this.unidadesComboCadastro = unidades;
    });

  }

  limpar() {
    this.unidade = new Unidade();
  }

  cancelar() {
    this.router.navigate(['usuariosistema']);
  }


  mostrarBotaoLimpar() {
    if (this.isAtualizar) {return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }



  adicionar() {
    this.usuarioSistema.unidades.push(this.unidade);
    this.limpar();
  }

  deletar(unidade: Unidade): void {
    const index = this.usuarioSistema.unidades.indexOf( this.usuarioSistema.unidades.find(uni => uni === unidade));
    if (index >= 0) {
      this.usuarioSistema.unidades.splice(index, 1);
      this.carregarLista();
    }
  }

  atualizar(unidade: Unidade) {

  }

  novo() {
   this.openFormCadastro = !this.openFormCadastro;
   this.limpar();
  }

  carregarLista() {
    if (this.usuarioSistema && this.usuarioSistema.id) {
        if (!this.usuarioSistema.unidades || this.usuarioSistema.unidades.length === 0) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum responsável cadastrado.';
        } else {
          this.dataSource.data = this.usuarioSistema.unidades ? this.usuarioSistema.unidades : [];
          this.mostrarTabela = true;
        }
    }
  }


}
