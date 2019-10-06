import { Familiares } from 'src/app/core/familiares';
import { Aluno } from './../../../core/aluno';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { FamiliarAlunoService } from 'src/app/services/familiar-aluno/familiar-aluno.service';
import { Router } from '@angular/router';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';

@Component({
  selector: 'familiares',
  templateUrl: './familiares.component.html',
  styleUrls: ['./familiares.component.css']
})
export class FamiliaresComponent implements OnInit {

  @Input() aluno: Aluno;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['nome', 'grauparentesco', 'situacao', 'dataCadastro', 'acoes'];
  dataSource: MatTableDataSource<Familiares> = new MatTableDataSource();

  constructor( private familiarService: FamiliarAlunoService,
               private router: Router,
               private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.consultar();
  }

  consultar() {
    if (this.aluno.id) {
      this.familiarService.getFamiliaresPorAluno(this.aluno.id).subscribe((familiares: any) => {
        if (!familiares || familiares.length === 0) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum familiar cadastrado para o aluno selecionado.';
        } else {
          this.dataSource.data = [familiares];
          this.mostrarTabela = true;
        }
      });
    }
  }

  vincular(familiar: Familiares) {
    this.router.navigate(['/familiaraluno/cadastrar'], { queryParams: { id: familiar.id } });
  }

}
