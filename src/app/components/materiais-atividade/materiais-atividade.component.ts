import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/core/atividade';
import { Acesso } from 'src/app/core/acesso';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { MateriaisAtividade } from 'src/app/core/materiais-atividade';
import { MateriaisAtividadeService } from 'src/app/services/materiais-atividade/materiais-atividade.service';

@Component({
  selector: 'app-materiais-atividade',
  templateUrl: './materiais-atividade.component.html',
  styleUrls: ['./materiais-atividade.component.css']
})
export class MateriaisAtividadeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaAtividade: Atividade[];
  mostrarTabela: boolean = false;
  msg: string;
  atividade: Atividade;

  perfilAcesso: Acesso;


  displayedColumns: string[] = [
    "descricao",
    "atividade",
    "dataAquisicao",
    "valorMaterial",
    "acoes"
  ];
  dataSource: MatTableDataSource<MateriaisAtividade> = new MatTableDataSource();

  constructor(
    private atividadeService: AtividadeService,
    private materiaisatividadeService: MateriaisAtividadeService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;
    this.atividadeService.getAll().subscribe((listaAtividade: Atividade[]) => {
      this.listaAtividade = listaAtividade;
    });

    this.materiaisatividadeService.getAll().subscribe((materiaisAtividade: MateriaisAtividade[]) => {
      this.dataSource.data = materiaisAtividade;
      this.mostrarTabela = true;
    });
  }

  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];
    this.atividade = null
    this.msg = "";
  }

  consultar() {
    this.materiaisatividadeService.getPorAtividade(this.atividade.id).subscribe(
      (materiaisAtividade: MateriaisAtividade[]) => {
        if (!MateriaisAtividade) {
          this.mostrarTabela = false;
          this.msg = "Nenhum registro para a pesquisa selecionada";
        } else {
          this.dataSource.data = materiaisAtividade;
          this.mostrarTabela = true;
        }
      },
      () => {
        this.msg = "Nenhum registro para a pesquisa selecionada";
        this.mostrarTabela = false;
        this.dataSource.data = [];
        this.msg = "";
      }
    );
  }

  atualizar(materiaisAtividade: MateriaisAtividade) {
    this.router.navigate(["/materiaisatividade/cadastrar"], {
      queryParams: { idMaterialAtividade: materiaisAtividade.id }
    });
  }

  deletar(materiaisAtividade: MateriaisAtividade) {
    this.chamaCaixaDialogo(materiaisAtividade);
  }

  chamaCaixaDialogo(materiaisAtividade: MateriaisAtividade) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o material da atividade?`,
      textoConfirma: "SIM",
      textoCancela: "NÃO"
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.materiaisatividadeService
          .excluir(materiaisAtividade.id)
          .subscribe(() => {
            this.consultar();
            this.atividade.id = null;
          });
      } else {
        dialogRef.close();
      }
    });
  }

}
