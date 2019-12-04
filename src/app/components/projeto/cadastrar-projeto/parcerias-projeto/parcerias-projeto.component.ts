import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { Cargo } from 'src/app/core/cargo';
import { Funcionario } from 'src/app/core/funcionario';
import { Projeto } from 'src/app/core/projeto';
import { TiposContratacoes } from 'src/app/core/tipos-contratacoes';
import { Unidade } from 'src/app/core/unidade';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { TiposContratacoesService } from 'src/app/services/tipos-contratacoes/tipos-contratacoes.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UnidadeSelecionadaService } from 'src/app/services/unidadeSelecionada/unidade-selecionada.service';
import { ParceriasProjeto } from 'src/app/core/parcerias-projeto';
import { Empresa } from 'src/app/core/empresa';

@Component({
  selector: 'parcerias-projeto',
  templateUrl: './parcerias-projeto.component.html',
  styleUrls: ['./parcerias-projeto.component.css']
})
export class ParceriasProjetoComponent implements OnInit {

  @Input() listaParceiros: ParceriasProjeto[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['nome', 'cpf', 'cargo', 'acoes'];
  dataSource: MatTableDataSource<ParceriasProjeto> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;

  parceriasProjeto: ParceriasProjeto = new ParceriasProjeto();
  empresas: Empresa[];

  constructor(
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private empresaService:EmpresaService
  ) {
  
  }

  ngOnInit() {

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.empresaService.getAll().subscribe((empresas:Empresa[]) => this.empresas = empresas);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaEmpresas"] && !_.isEmpty(changes["listaEmpresas"].currentValue)) {
      this.carregarLista();
    }

  }

  limpar() {
    this.parceriasProjeto = new ParceriasProjeto();
  }

  isUnidadeJaAdicionada(): boolean {
    const unidadeAdicionada = this.listaParceiros.find((e: ParceriasProjeto) => e.id === this.parceriasProjeto.id);

    return !!unidadeAdicionada;

  }

  adicionar() {
    if (this.isUnidadeJaAdicionada()) {
      this.toastService.showAlerta('Parceiro já adicionado');
      return;
    }

    const parceriaProjetoSelecionado = new ParceriasProjeto();
    Object.assign(parceriaProjetoSelecionado, this.parceriasProjeto);

    this.listaParceiros.push(parceriaProjetoSelecionado);
    this.limpar();
  }

  deletar(parceriasProjeto: ParceriasProjeto): void {
    const index = this.listaParceiros.indexOf(this.listaParceiros.find(e => e.id === parceriasProjeto.id));
    if (index >= 0) {
      this.listaParceiros.splice(index, 1);
      this.carregarLista();
    }
  }

  novo() {
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
  }

  carregarLista() {
    if (this.listaParceiros.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma parceiro adicionado.';
    } else {
      this.dataSource.data = this.listaParceiros ? this.listaParceiros : [];
      this.mostrarTabela = true;
    }
  }

}
