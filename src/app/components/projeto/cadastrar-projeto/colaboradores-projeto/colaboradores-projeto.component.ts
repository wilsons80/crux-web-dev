import { TiposContratacoesService } from './../../../../services/tipos-contratacoes/tipos-contratacoes.service';
import { Component, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Cargo } from 'src/app/core/cargo';
import { ColaboradoresProjeto } from 'src/app/core/colaboradores-projeto';
import { Funcionario } from 'src/app/core/funcionario';
import { Projeto } from 'src/app/core/projeto';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import { TiposContratacoes } from 'src/app/core/tipos-contratacoes';
import * as _ from 'lodash';
import { Unidade } from 'src/app/core/unidade';
import { UnidadeSelecionadaService } from 'src/app/services/unidadeSelecionada/unidade-selecionada.service';

@Component({
  selector: 'colaboradores-projeto',
  templateUrl: './colaboradores-projeto.component.html',
  styleUrls: ['./colaboradores-projeto.component.css']
})
export class ColaboradoresProjetoComponent implements OnInit {
  
  @Input() listaColaboradoresProjeto: ColaboradoresProjeto[];
  @Input() unidades: Unidade[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['nome', 'cpf', 'cargo', 'acoes'];
  dataSource: MatTableDataSource<ColaboradoresProjeto> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;

  unidadesComboCadastro: any[];
  colaboradoresProjeto: ColaboradoresProjeto = new ColaboradoresProjeto();
  funcionarios: Funcionario[] = [];
  cargos: Cargo[] =[];
  projetos: Projeto[] = [];
  listaTiposContratacoes: TiposContratacoes[] = [];

  constructor(
    private toastService: ToastService,
    private funcionarioService: FuncionarioService,
    private cargosService: CargosService,
    private projetoService: ProjetoService,
    private activatedRoute:ActivatedRoute,
    private tiposContratacoesService:TiposContratacoesService,
    private unidadeSelecionadaService:UnidadeSelecionadaService
  ) { 

    this.unidadeSelecionadaService.unidadesSelecionadas.subscribe((unidades: Unidade[]) => {
      this.unidades = unidades
      this.getfuncionarios();
    })

  }

  ngOnInit() {

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.cargosService.getAll().subscribe((cargos: Cargo[]) => this.cargos = cargos);
    this.tiposContratacoesService.getAll().subscribe((tiposContratacoes: TiposContratacoes[]) => this.listaTiposContratacoes = tiposContratacoes);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["listaColaboradoresProjeto"] && !_.isEmpty (changes["listaColaboradoresProjeto"].currentValue)){
      this.carregarLista();
    }
    
  }
  
  limpar() {
    this.colaboradoresProjeto = new ColaboradoresProjeto();
  }
  
  isJaAdicionada(): boolean {
    const unidadeAdicionada = this.listaColaboradoresProjeto.find((cp: ColaboradoresProjeto) => cp.funcionario.id === this.colaboradoresProjeto.funcionario.id);
    
    return !!unidadeAdicionada;
    
  }
  
  adicionar() {
    if (this.isJaAdicionada()) {
      this.toastService.showAlerta('Colaborador já adicionado');
      return;
    }
    
    const colaboradorSelecionado = new ColaboradoresProjeto();
    Object.assign(colaboradorSelecionado, this.colaboradoresProjeto);
    
    this.listaColaboradoresProjeto.push(colaboradorSelecionado);
    this.limpar();
  }
  
  deletar(colaboradoresProjeto: ColaboradoresProjeto): void {
    const index = this.listaColaboradoresProjeto.indexOf(this.listaColaboradoresProjeto.find(cp => cp.funcionario.id === colaboradoresProjeto.funcionario.id));
    if (index >= 0) {
      this.listaColaboradoresProjeto.splice(index, 1);
      this.carregarLista();
    }
  }
  
  novo() {
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
  }
  
  carregarLista() {
    if (this.listaColaboradoresProjeto.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma colaborador adicionado.';
    } else {
      this.dataSource.data = this.listaColaboradoresProjeto ? this.listaColaboradoresProjeto : [];
      this.mostrarTabela = true;
    }
  }
  
  isDesabilitado(){
    return !this.colaboradoresProjeto.funcionario || !this.colaboradoresProjeto.cargo
    || !this.colaboradoresProjeto.dataInicio || !this.colaboradoresProjeto.projeto
  }
  
  getfuncionarios() {
    const idsUnidades:number[] = this.unidades.map((u:Unidade) => u.idUnidade);
    this.funcionarioService.getPorIntituicao(idsUnidades).subscribe((funcionarios:Funcionario[]) => {
      this.funcionarios = funcionarios;
      console.log("func", this.funcionarios);
      
    })
  }

}
