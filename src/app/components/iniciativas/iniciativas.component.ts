import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Iniciativa } from 'src/app/core/iniciativa';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { IniciativaService } from './../../services/iniciativa/iniciativa.service';

@Component({
  selector: 'app-iniciativa',
  templateUrl: './iniciativas.component.html',
  styleUrls: ['./iniciativas.component.css']
})
export class IniciativasComponent implements OnInit {

  iniciativas: Iniciativa[];
  mostrarTabela: boolean = false;
  iniciativa: Iniciativa = new Iniciativa();


  displayedColumns: string[] = ['nome', 'metas', 'dataInicio', 'dataFim', 'acoes'];


  dataSource: MatTableDataSource<Iniciativa> = new MatTableDataSource();

  constructor(
    private iniciativaService: IniciativaService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.iniciativaService.getAll().subscribe((iniciativas: Iniciativa[]) => {
      this.iniciativas = iniciativas
    })
  }

  limpar() {
    this.mostrarTabela = false;
    this.iniciativa = new Iniciativa()
    this.dataSource.data = null;
  }

  consultar() {
    if (this.iniciativa.id) {
      this.iniciativaService.getById(this.iniciativa.id).subscribe((iniciativa: Iniciativa) => {
        this.dataSource.data = [iniciativa];
      })
    } else {
      this.iniciativaService.getAll().subscribe((iniciativa: Iniciativa[]) => {
        this.iniciativas = iniciativa
        this.dataSource.data = iniciativa;
      })
    }
    this.mostrarTabela = true;
  }


  atualizar(iniciativa: Iniciativa) {
    this.router.navigate(['/iniciativa/cadastrar'], { queryParams: { idIniciativa: iniciativa.id } });
  }

  deletar(iniciativa: Iniciativa) {
    this.chamaCaixaDialogo(iniciativa);
  }

  chamaCaixaDialogo(iniciativa: Iniciativa) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a iniciativa ${iniciativa.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {

        this.iniciativaService.excluir(iniciativa.id).subscribe(() => {

          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

}
