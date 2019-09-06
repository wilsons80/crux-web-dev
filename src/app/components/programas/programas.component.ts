import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
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

  listaProgramas: Programa[];
  programa: Programa = new Programa();

  mostrarTabela = false;

  displayedColumns: string[] = ['nome', 'objetivo', 'dataInicio', 'dataFim', 'acoes'];
  dataSource: MatTableDataSource<Programa> = new MatTableDataSource();

  constructor(
    private programaService: ProgramaService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.programaService.getAll().subscribe((listaProgramas: Programa[]) => {
      this.listaProgramas = listaProgramas;
    })
  }

  limpar() {
    this.programa = new Programa()
    this.dataSource.data = null;
  }

  consultar() {
    if (this.programa.id) {
      this.programaService.getById(this.programa.id).subscribe((programa: Programa) => {
        this.dataSource.data = [programa];
      })
    } else {
      this.programaService.getAll().subscribe((programa: Programa[]) => {
        this.listaProgramas = programa
        this.dataSource.data = programa;
      })
    }
    this.mostrarTabela = true;
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

          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

}
