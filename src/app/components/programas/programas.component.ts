import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { PlanosAcao } from 'src/app/core/planos-acao';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Programa } from './../../core/programa';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.css']
})
export class ProgramasComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaProgramas: Programa[];
  programa: Programa = new Programa();
  msg:string;

  mostrarTabela = false;

  displayedColumns: string[] = ['nome', 'objetivo', 'dataInicio', 'dataFim', 'acoes'];
  dataSource: MatTableDataSource<Programa> = new MatTableDataSource();

  constructor(
    private programaService: ProgramaService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  limpar() {
    this.mostrarTabela = false;
    this.programa = new Programa()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.programa.id) {
      this.programaService.getById(this.programa.id).subscribe((programa: Programa) => {
        if(!programa){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [programa];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(programa: Programa) {
    this.router.navigate(['/programas/cadastrar'], { queryParams: { idPrograma: programa.id } });
  }

  deletar(programa: Programa) {
    this.chamaCaixaDialogo(programa);
  }

  chamaCaixaDialogo(programa: Programa) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir o programa ${programa.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.programaService.excluir(programa.id).subscribe(() => {
          this.programa.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.programaService.getAll().subscribe((listaProgramas: Programa[]) => {
      this.listaProgramas = listaProgramas;
      this.dataSource.data = listaProgramas ? listaProgramas : [];
      this.verificaMostrarTabela(listaProgramas);
    })
  }

  verificaMostrarTabela(listaProgramas: Programa[]) {
    if(!listaProgramas ||listaProgramas.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum programa cadastrado."
    }else{
      this.mostrarTabela = true; 
    }
  }
}
