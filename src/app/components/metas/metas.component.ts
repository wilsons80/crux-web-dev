import { Component, OnInit } from '@angular/core';
import { Metas } from 'src/app/core/metas';
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { MetasService } from 'src/app/services/metas/metas.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {

  listaMetas: Metas[];
  mostrarTabela: boolean = false;
  metas: Metas = new Metas();

  displayedColumns: string[] = ['nome', 'indicadores', 'dataInicio','dataFim', 'acoes'];

  
  dataSource: MatTableDataSource<Metas> = new MatTableDataSource();

  constructor(
    private metasService: MetasService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.metasService.getAll().subscribe((metas: Metas[]) => {
      this.listaMetas = metas
    })
  }

  limpar() {
    this.mostrarTabela = false;
    this.metas = new Metas()
    this.dataSource.data = null;
  }

  consultar() {
    if (this.metas.id) {
      this.metasService.getById(this.metas.id).subscribe((metas: Metas) => {
        this.dataSource.data = [metas];
      })
    } else {
      this.metasService.getAll().subscribe((listaMetas: Metas[]) => {
        this.listaMetas = listaMetas
        this.dataSource.data = listaMetas;
      })
    }
    this.mostrarTabela = true;
  }


  atualizar(metas: Metas) {
    this.router.navigate(['/metas/cadastrar'], { queryParams: { idMetas: metas.id } });
  }

  deletar(metas: Metas) {
    this.chamaCaixaDialogo(metas);
  }

  chamaCaixaDialogo(metas: Metas) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a meta ${metas.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {

        this.metasService.excluir(metas.id).subscribe(() => {

          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

}
