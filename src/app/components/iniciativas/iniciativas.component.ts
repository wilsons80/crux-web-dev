import { Component, OnInit } from '@angular/core';
import { Iniciativa } from 'src/app/core/iniciativa';
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { MetasService } from 'src/app/services/metas/metas.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-iniciativa',
  templateUrl: './iniciativa.component.html',
  styleUrls: ['./iniciativa.component.css']
})
export class IniciativasComponent implements OnInit {

  listaIniciativa: Iniciativa[];
  mostrarTabela: boolean = false;
  iniciativa: Iniciativa = new Iniciativa();

  displayedColumns: string[] = ['nome', 'indicadores', 'dataInicio','dataFim', 'acoes'];

  
  dataSource: MatTableDataSource<Iniciativa> = new MatTableDataSource();

  constructor(
    private metasService: MetasService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.metasService.getAll().subscribe((iniciativas: Iniciativa[]) => {
      this.listaIniciativa = iniciativas
    })
  }

  limpar() {
    this.mostrarTabela = false;
    this.iniciativa = new Iniciativa()
    this.dataSource.data = null;
  }

  consultar() {
    if (this.iniciativa.id) {
      this.metasService.getById(this.iniciativa.id).subscribe((iniciativa: Iniciativa) => {
        this.dataSource.data = [iniciativa];
      })
    } else {
      this.metasService.getAll().subscribe((listaIniciativa: Iniciativa[]) => {
        this.listaIniciativa = listaIniciativa
        this.dataSource.data = listaIniciativa;
      })
    }
    this.mostrarTabela = true;
  }


  atualizar(iniciativa: Iniciativa) {
    this.router.navigate(['/iniciativa/cadastrar'], { queryParams: { idMetas: iniciativa.id } });
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

        this.metasService.excluir(iniciativa.id).subscribe(() => {

          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

}
