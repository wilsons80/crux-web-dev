import { MaterialService } from 'src/app/services/material/material.service';
import { MateriaisProjeto } from './../../../../core/materiais-projeto';
import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { ParceriasProjeto } from 'src/app/core/parcerias-projeto';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { Empresa } from 'src/app/core/empresa';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import * as _ from 'lodash';
import { Material } from 'src/app/core/material';
import { Projeto } from 'src/app/core/projeto';

@Component({
  selector: 'materiais-projeto',
  templateUrl: './materiais-projeto.component.html',
  styleUrls: ['./materiais-projeto.component.css']
})
export class MateriaisProjetoComponent implements OnInit {

  @Input() projeto:Projeto = new Projeto();
  @Input() listaMateriaisProjeto:MateriaisProjeto[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['parceiro', 'projeto', 'valor', 'acoes'];
  dataSource: MatTableDataSource<MateriaisProjeto> = new MatTableDataSource();

  openFormCadastro = false;

  perfilAcesso: Acesso;

  isAtualizar = false;


  materiaisProjeto:MateriaisProjeto;
  listaParceriasProjeto: ParceriasProjeto[] =[];
  materiais:Material[]= [];

  constructor(
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private materialService:MaterialService
  ) {

  }

  ngOnInit() {

    this.initObjetos();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.materialService.getAll().subscribe((materiais:Material[]) => this.materiais = materiais);

  }

  initObjetos() {
    this.materiaisProjeto = new MateriaisProjeto();
    this.materiaisProjeto.material = new Material();
    this.materiaisProjeto.parceriasProjeto = new ParceriasProjeto();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaMateriaisProjeto"] && !_.isEmpty(changes["listaMateriaisProjeto"].currentValue)) {
      this.carregarLista();
    }

  }

  limpar() {
    this.initObjetos(); 
  }


  adicionar() {

    const materiaisProjetoSelecionado = new MateriaisProjeto();
    Object.assign(materiaisProjetoSelecionado, this.materiaisProjeto);

    this.getObjetosCompletosParaLista(materiaisProjetoSelecionado);

    this.listaMateriaisProjeto.push(materiaisProjetoSelecionado);
    this.limpar();
  }

  getObjetosCompletosParaLista(materiaisProjetoSelecionado: MateriaisProjeto) {
    materiaisProjetoSelecionado.parceriasProjeto = _.find(this.listaParceriasProjeto, (parceriasProjeto: ParceriasProjeto) => parceriasProjeto.id == materiaisProjetoSelecionado.parceriasProjeto.id);
    materiaisProjetoSelecionado.material = _.find(this.materiais, (material: Material) => material.id == materiaisProjetoSelecionado.material.id);
    
  }


  deletar(parceriasProjeto: ParceriasProjeto): void {
    // const index = this.listaParceiros.indexOf(this.listaParceiros.find(e => e.id === parceriasProjeto.id));
    // if (index >= 0) {
    //   this.listaParceiros.splice(index, 1);
    //   this.carregarLista();
    // }
  }

  novo() {
    this.isAtualizar = false;
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
  }

  carregarLista() {
    if (this.listaMateriaisProjeto.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum material adicionado ao projeto.';
    } else {
      this.dataSource.data = this.listaMateriaisProjeto ? this.listaMateriaisProjeto : [];
      this.mostrarTabela = true;
    }
  }

  atualizar() {
    // let parceiro: ParceriasProjeto = _.find(this.listaParceiros, (parceiro: ParceriasProjeto) => parceiro.id == this.parceriasProjeto.id);
    // parceiro = this.parceriasProjeto;
    // parceiro.id = null;
    // this.limpar();
    // this.openFormCadastro = false;
    // this.isAtualizar = false;
  }

  atualizarComposicao(parceiro: ParceriasProjeto) {
    // this.parceriasProjeto = parceiro;
    // this.openFormCadastro = true;
    // this.isAtualizar = true;
  }


}
