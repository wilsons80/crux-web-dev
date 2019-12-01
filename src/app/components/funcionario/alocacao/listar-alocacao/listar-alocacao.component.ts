import { AlocacaoFuncionario } from './../../../../core/alocacao-funcionario';
import { Funcionario } from 'src/app/core/funcionario';
import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'listar-alocacao',
  templateUrl: './listar-alocacao.component.html',
  styleUrls: ['./listar-alocacao.component.css']
})
export class ListarAlocacaoComponent implements OnInit {


  @Output() onAlocacao = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();
  @Input() funcionario: Funcionario;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['programa_projeto', 'dataInicio', 'dataFim', 'acoes'];
  dataSource: MatTableDataSource<AlocacaoFuncionario> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.carregarListaAlocacao();
  }

  carregarListaAlocacao() {
    if (this.funcionario && this.funcionario.alocacoesFuncionario) {
      if (!this.funcionario.alocacoesFuncionario || this.funcionario.alocacoesFuncionario.length === 0) {
        this.mostrarTabela = false;
        this.msg = 'Nenhum alocação cadastrada.';
      } else {
        this.dataSource.data = this.funcionario.alocacoesFuncionario ? this.funcionario.alocacoesFuncionario : [];
        this.mostrarTabela = true;
      }
    }
  }

  atualizar(alocacao) {
    this.onAlocacao.emit(alocacao);
    this.onAdicionar.emit(true);
  }

  deletar(alocacao: any): void {
    const index = this.funcionario.alocacoesFuncionario.indexOf( this.funcionario.alocacoesFuncionario.find(aloc => aloc === alocacao));
    if (index >= 0) {
      this.funcionario.alocacoesFuncionario.splice(index, 1);
      this.carregarListaAlocacao();
    }
  }

  novo() {
    this.onAdicionar.emit(true);
  }

}
