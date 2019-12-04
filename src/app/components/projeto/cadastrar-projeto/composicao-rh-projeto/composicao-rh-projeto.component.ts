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
import { ToastService } from 'src/app/services/toast/toast.service';
import { UnidadeSelecionadaService } from 'src/app/services/unidadeSelecionada/unidade-selecionada.service';
import { TiposContratacoesService } from '../../../../services/tipos-contratacoes/tipos-contratacoes.service';
import { ComposicaoRhProjeto } from 'src/app/core/composicao-rh-projeto';

@Component({
  selector: 'composicao-rh-projeto',
  templateUrl: './composicao-rh-projeto.component.html',
  styleUrls: ['./composicao-rh-projeto.component.css']
})
export class ComposicaoRhProjetoComponent implements OnInit {

  @Input() listaComposicaoRhProjeto: ComposicaoRhProjeto[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['cargo', 'tipoContratacao', 'qtd', 'acoes'];
  dataSource: MatTableDataSource<ComposicaoRhProjeto> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;

  composicaoRhProjeto: ComposicaoRhProjeto = new ComposicaoRhProjeto();
  cargos: Cargo[] = [];
  listaTiposContratacoes: TiposContratacoes[] = [];

  constructor(
    private toastService: ToastService,
    private cargosService: CargosService,
    private activatedRoute: ActivatedRoute,
    private tiposContratacoesService: TiposContratacoesService,
  ) {}

  ngOnInit() {

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.cargosService.getAll().subscribe((cargos: Cargo[]) => this.cargos = cargos);
    this.tiposContratacoesService.getAll().subscribe((tiposContratacoes: TiposContratacoes[]) => this.listaTiposContratacoes = tiposContratacoes);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaComposicaoRhProjeto"] && !_.isEmpty(changes["listaComposicaoRhProjeto"].currentValue)) {
      this.carregarLista();
    }

  }

  limpar() {
    this.composicaoRhProjeto = new ComposicaoRhProjeto();
  }

  isJaAdicionada(): boolean {
    const unidadeAdicionada = this.listaComposicaoRhProjeto.find((cp: ComposicaoRhProjeto) => cp.cargo.id === this.composicaoRhProjeto.cargo.id);

    return !!unidadeAdicionada;

  }

  adicionar() {
    if (this.isJaAdicionada()) {
      this.toastService.showAlerta('Composição para esse cargo já adicionado');
      return;
    }

    const colaboradorSelecionado = new ComposicaoRhProjeto();
    Object.assign(colaboradorSelecionado, this.composicaoRhProjeto);

    this.listaComposicaoRhProjeto.push(colaboradorSelecionado);
    this.limpar();
  }

  deletar(composicaoRhProjeto: ComposicaoRhProjeto): void {
    const index = this.listaComposicaoRhProjeto.indexOf(this.listaComposicaoRhProjeto.find(cp => cp.cargo.id === composicaoRhProjeto.cargo.id));
    if (index >= 0) {
      this.listaComposicaoRhProjeto.splice(index, 1);
      this.carregarLista();
    }
  }

  novo() {
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
  }

  carregarLista() {
    if (this.listaComposicaoRhProjeto.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum cargo adicionado.';
    } else {
      this.dataSource.data = this.listaComposicaoRhProjeto ? this.listaComposicaoRhProjeto : [];
      this.mostrarTabela = true;
    }
  }

}
