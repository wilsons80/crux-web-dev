import { VulnerabilidadesAluno } from './../../../../core/vulnerabilidades-aluno';
import { Aluno } from './../../../../core/aluno';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'listar-vulnerabilidade-aluno',
  templateUrl: './listar-vulnerabilidade-aluno.component.html',
  styleUrls: ['./listar-vulnerabilidade-aluno.component.css']
})
export class ListarVulnerabilidadeAlunoComponent implements OnInit {

  @Output() onVulnerabilidade = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();
  @Input() aluno: Aluno;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['nome', 'dataIdentificacao', 'dataSolucao', 'vulnerabilidade', 'solucao', 'acoes'];
  dataSource: MatTableDataSource<VulnerabilidadesAluno> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.carregarLista();
  }

  carregarLista() {
    if (!this.aluno.vulnerabilidades || this.aluno.vulnerabilidades.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma vulnerabilidade cadastrada.';
    } else {
      this.dataSource.data = this.aluno.vulnerabilidades ? this.aluno.vulnerabilidades : [];
      this.mostrarTabela = true;
    }
  }

  atualizar(vulnerabilidade) {
    this.onVulnerabilidade.emit(vulnerabilidade);
    this.onAdicionar.emit(true);
  }

  deletar(vulnerabilidade: any): void {
    const index = this.aluno.vulnerabilidades.indexOf( this.aluno.vulnerabilidades.find(vul => vul === vulnerabilidade));
    if (index >= 0) {
      this.aluno.vulnerabilidades.splice(index, 1);
      this.carregarLista();
    }
  }

  novo() {
    this.onAdicionar.emit(true);
  }
}
