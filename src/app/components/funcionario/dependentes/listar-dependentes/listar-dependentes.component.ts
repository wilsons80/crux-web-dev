import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { Funcionario } from 'src/app/core/funcionario';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Dependentes } from 'src/app/core/dependentes';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'listar-dependentes',
  templateUrl: './listar-dependentes.component.html',
  styleUrls: ['./listar-dependentes.component.css']
})
export class ListarDependentesComponent implements OnInit {

  @Output() onDependente = new EventEmitter();
  @Output() onAdicionar = new EventEmitter();
  @Input() funcionario: Funcionario;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['nome', 'grauParentesco', 'sexo', 'possuiDeficiencia', 'acoes'];
  dataSource: MatTableDataSource<Dependentes> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.carregarListaDependentes();
  }

  carregarListaDependentes() {
    if (this.funcionario && this.funcionario.dependentes) {
      if (!this.funcionario.dependentes || this.funcionario.dependentes.length === 0) {
        this.mostrarTabela = false;
        this.msg = 'Nenhum dependente cadastrado.';
      } else {
        this.dataSource.data = this.funcionario.dependentes ? this.funcionario.dependentes : [];
        this.mostrarTabela = true;
      }
    }
  }

  atualizar(dependente) {
    this.onDependente.emit(dependente);
    this.onAdicionar.emit(true);
  }

  deletar(dependente: any): void {
    const index = this.funcionario.dependentes.indexOf( this.funcionario.dependentes.find(d => d === dependente));
    if (index >= 0) {
      this.funcionario.dependentes.splice(index, 1);
      this.carregarListaDependentes();
    }
  }

  novo() {
    this.onAdicionar.emit(true);
  }

}
