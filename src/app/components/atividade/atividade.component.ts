import { Component, OnInit } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';
import { MatDialogConfig, MatTableDataSource, MatDialog } from '@angular/material';
import { Programa } from 'src/app/core/programa';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.css']
})
export class AtividadeComponent implements OnInit {

  atividades: Atividade[];
  atividade: Atividade = new Atividade();

  mostrarTabela = false;

  displayedColumns: string[] = ['descricao', 'dataPrevisaoInicio', 'dataPrevisaoTermino', 'cargaHoraria', 'acoes'];
  dataSource: MatTableDataSource<Atividade> = new MatTableDataSource();

  constructor(
    private programaService: ProgramaService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.programaService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    })
  }

  limpar() {
    this.atividade = new Atividade()
    this.dataSource.data = null;
  }

  consultar() {
    if (this.atividade.id) {
      this.programaService.getById(this.atividade.id).subscribe((atividade: Atividade) => {
        this.dataSource.data = [atividade];
      })
    } else {
      this.programaService.getAll().subscribe((atividade: Atividade[]) => {
        this.atividades = atividade
        this.dataSource.data = atividade;
      })
    }
    this.mostrarTabela = true;
  }


  atualizar(atividade: Atividade) {
    this.router.navigate(['/atividade/cadastrar'], { queryParams: { idPrograma: atividade.id } });
  }

  deletar(atividade: Atividade) {
    this.chamaCaixaDialogo(atividade);
  }

  chamaCaixaDialogo(atividade: Atividade) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a atividade ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {

        this.programaService.excluir(atividade.id).subscribe(() => {

          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

}
