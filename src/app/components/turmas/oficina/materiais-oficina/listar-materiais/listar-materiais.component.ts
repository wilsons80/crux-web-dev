import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { MateriaisAtividade } from 'src/app/core/materiais-atividade';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'listar-materiais',
  templateUrl: './listar-materiais.component.html',
  styleUrls: ['./listar-materiais.component.css']
})
export class ListarMateriaisComponent implements OnInit {

  @Output() onAtualizarMaterial = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();

  @Input() materiaisAtividade: MateriaisAtividade[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['atividade', 'material', 'datainicio', 'quantidade', 'acoes'];
  dataSource: MatTableDataSource<MateriaisAtividade> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.carregarLista();
  }

  carregarLista() {
      if (_.isEmpty(this.materiaisAtividade)) {
        this.mostrarTabela = false;
        this.msg = 'Nenhum material cadastrado.';
      } else {
        this.dataSource.data = this.materiaisAtividade;
        this.mostrarTabela = true;
    }
  }

  deletar(materialAtividade: any): void {
    const index = this.materiaisAtividade.indexOf( this.materiaisAtividade.find(col => col === materialAtividade));
    if (index >= 0) {
      this.materiaisAtividade.splice(index, 1);
      this.carregarLista();
    }
  }

  atualizar(materialAtividade: MateriaisAtividade) {
    this.onAtualizarMaterial.emit(materialAtividade);
    this.onAdicionar.emit(true);
  }

  novo() {
    this.onAdicionar.emit(true);
  }

}
