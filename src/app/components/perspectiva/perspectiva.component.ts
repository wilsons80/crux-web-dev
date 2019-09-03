import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Perspectiva } from 'src/app/core/perspectiva';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { PerspectivaService } from './../../services/perspectiva/perspectiva.service';

@Component({
  selector: 'app-perspectiva',
  templateUrl: './perspectiva.component.html',
  styleUrls: ['./perspectiva.component.css']
})
export class PerspectivaComponent implements OnInit {

  perspectivas: Perspectiva[];
  mostrarTabela: boolean = false;
  perspectiva: Perspectiva = new Perspectiva();


  displayedColumns: string[] = ['nome', 'dtImplantacao', 'dtTermino','unidade', 'acoes'];
  dataSource: MatTableDataSource<Perspectiva> = new MatTableDataSource();

  constructor(
    private perspectivaService: PerspectivaService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    let idUnidadeLogada = this.activatedRoute.snapshot.params.idUnidade;
    this.perspectivaService.getAll(idUnidadeLogada).subscribe((perspectivas: Perspectiva[]) => {
      this.perspectivas = perspectivas
    })
  }

  limpar() {
    this.mostrarTabela = false;
    this.perspectiva = new Perspectiva();
    this.dataSource.data = null;
  }

  consultar() {
    if (this.perspectiva.idPerspectiva) {
      this.perspectivaService.getDepartamentoById(this.perspectiva.idPerspectiva).subscribe((perspectiva: Perspectiva) => {
        let array = [];
        array.push(perspectiva);
        this.dataSource.data = array
      })
    } else {
      this.dataSource.data = this.perspectivas;
    }
    this.mostrarTabela = true;
  }


  atualizar(perspectiva: Perspectiva) {
    this.router.navigate(['/perspectiva/cadastrar'], { queryParams: { idPerspectiva: perspectiva.idPerspectiva } });
  }

  deletar(perspectiva: Perspectiva) {
    this.chamaCaixaDialogo(perspectiva);
  }

  chamaCaixaDialogo(perspectiva: Perspectiva) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a unidade ${perspectiva.nmPerspectiva}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {

        this.perspectivaService.excluir(perspectiva.idPerspectiva).subscribe(() => {
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

}

