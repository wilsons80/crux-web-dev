import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AcaoCompetencia } from 'src/app/core/acao-competencia';
import { AcoesCompetenciaService } from 'src/app/services/acoes-competencia/acoes-competencia.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { PerfilAcesso } from './../../core/perfil-acesso';

@Component({
  selector: 'app-acao-competencia',
  templateUrl: './acao-competencia.component.html',
  styleUrls: ['./acao-competencia.component.css']
})
export class AcaoCompetenciaComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaAcaoCompetencia: AcaoCompetencia[];
  mostrarTabela: boolean = false;
  acaoCompetencia: AcaoCompetencia = new AcaoCompetencia();
  msg: string;

  perfilAcesso: PerfilAcesso;

  displayedColumns: string[] = ['descricao', 'dataInicio', 'acoes'];


  dataSource: MatTableDataSource<AcaoCompetencia> = new MatTableDataSource();

  constructor(
    private acoesCompetenciaService: AcoesCompetenciaService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.acaoCompetencia = new AcaoCompetencia()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.acaoCompetencia.id) {
      this.acoesCompetenciaService.getById(this.acaoCompetencia.id).subscribe((acaoCompetencia: AcaoCompetencia) => {
        if (!acaoCompetencia) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [acaoCompetencia];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(acaoCompetencia: AcaoCompetencia) {
    this.router.navigate(['/acaocompetencia/cadastrar'], { queryParams: { idAcaoCompetencia: acaoCompetencia.id } });
  }

  deletar(acaoCompetencia: AcaoCompetencia) {
    this.chamaCaixaDialogo(acaoCompetencia);
  }

  chamaCaixaDialogo(acaoCompetencia: AcaoCompetencia) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a ação competência?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.acoesCompetenciaService.excluir(acaoCompetencia.id).subscribe(() => {
          this.acaoCompetencia.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.acoesCompetenciaService.getAll().subscribe((acaoCompetencias: AcaoCompetencia[]) => {
      this.listaAcaoCompetencia = acaoCompetencias;
      this.dataSource.data = acaoCompetencias ? acaoCompetencias : [];
      this.verificaMostrarTabela(acaoCompetencias);
    })
  }

  verificaMostrarTabela(acaoCompetencias: AcaoCompetencia[]) {
    if (!acaoCompetencias || acaoCompetencias.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma acaoCompetencia cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }

}
