import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Funcionario } from 'src/app/core/funcionario';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { VulnerabilidadesFamiliar } from 'src/app/core/vulnerabilidades-familiar';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ColaboradoresAtividade } from 'src/app/core/colaboradores-atividade';

@Component({
  selector: 'listar-colaboradores-atividade',
  templateUrl: './listar-colaboradores-atividade.component.html',
  styleUrls: ['./listar-colaboradores-atividade.component.css']
})
export class ListarColaboradoresAtividadeComponent implements OnInit {

  @Output() onAtualizarColaborador = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();
  @Input() colaboradoresAtividade: ColaboradoresAtividade[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;
  
  displayedColumns: string[] = ['matricula', 'nome', 'cargo', 'tipoCargo', 'acoes'];
  dataSource: MatTableDataSource<ColaboradoresAtividade> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.carregarLista();
  }

  carregarLista() {
      if (_.isEmpty(this.colaboradoresAtividade)) {
        this.mostrarTabela = false;
        this.msg = 'Nenhum colaborador cadastrado.';
      } else {
        this.dataSource.data = this.colaboradoresAtividade;
        this.mostrarTabela = true;
    }
  }

  deletar(colaborador: any): void {
    const index = this.colaboradoresAtividade.indexOf( this.colaboradoresAtividade.find(col => col === colaborador));
    if (index >= 0) {
      this.colaboradoresAtividade.splice(index, 1);
      this.carregarLista();
    }
  }

  atualizar(colaboradorAtividade:ColaboradoresAtividade) {
    this.onAtualizarColaborador.emit(colaboradorAtividade);
    this.onAdicionar.emit(true);
  }

  novo() {
    this.onAdicionar.emit(true);
  }

  getBackground(funcionario:Funcionario) {
    if (funcionario.pessoasFisica && funcionario.pessoasFisica.urlFoto) {
      return `url(${funcionario.pessoasFisica.urlFoto})`;
    }
  }

}
