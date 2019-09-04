import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Indicadores } from './../../core/indicadores';
import { IndicadoresService } from './../../services/indicadores/indicadores.service';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  listaIndicadores: Indicadores[];
  mostrarTabela: boolean = false;
  indicadores: Indicadores = new Indicadores();

  displayedColumns: string[] = ['nome', 'objetivo', 'dataInicio','dataFim', 'acoes'];
  dataSource: MatTableDataSource<Indicadores> = new MatTableDataSource();

  constructor(
    private indicadoresService: IndicadoresService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.indicadoresService.getAll().subscribe((indicadores: Indicadores[]) => {
      this.listaIndicadores = indicadores
    })
  }

  limpar() {
    this.mostrarTabela = false;
    this.indicadores = new Indicadores()
    this.dataSource.data = null;
  }

  consultar() {
    if (this.indicadores.idIndicador) {
      this.indicadoresService.getById(this.indicadores.idIndicador).subscribe((indicadores: Indicadores) => {
        this.dataSource.data = [indicadores];
      })
    } else {
      this.indicadoresService.getAll().subscribe((listaIndicadores: Indicadores[]) => {
        this.listaIndicadores = listaIndicadores
        this.dataSource.data = listaIndicadores;
      })
    }
    this.mostrarTabela = true;
  }


  atualizar(indicadores: Indicadores) {
    this.router.navigate(['/indicadores/cadastrar'], { queryParams: { idIndicador: indicadores.idIndicador } });
  }

  deletar(indicadores: Indicadores) {
    this.chamaCaixaDialogo(indicadores);
  }

  chamaCaixaDialogo(indicadores: Indicadores) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir o departamento ${indicadores.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {

        this.indicadoresService.excluir(indicadores.idIndicador).subscribe(() => {

          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

}
