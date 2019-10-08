import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { Atividade } from "src/app/core/atividade";
import { DocumentoAtividade } from "src/app/core/documento-atividade";
import { AtividadeService } from "src/app/services/atividade/atividade.service";
import { DocumentoAtividadeService } from "src/app/services/documento-atividade/documento-atividade.service";
import { ConfirmDialogComponent } from "../common/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-documento-atividade",
  templateUrl: "./documento-atividade.component.html",
  styleUrls: ["./documento-atividade.component.css"]
})
export class DocumentoAtividadeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaAtividade: Atividade[];
  mostrarTabela: boolean = false;
  msg: string;
  atividade: Atividade;

  displayedColumns: string[] = [
    "descricao",
    "atividade",
    "acoes"
  ];
  dataSource: MatTableDataSource<DocumentoAtividade> = new MatTableDataSource();

  constructor(
    private atividadeService: AtividadeService,
    private documentoAtividadeService: DocumentoAtividadeService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.atividadeService.getAll().subscribe((listaAtividade: Atividade[]) => {
      this.listaAtividade = listaAtividade;
    });
  }

  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];
    this.msg = "";
  }

  consultar() {
    this.documentoAtividadeService.getPorAtividade(this.atividade.id).subscribe(
      (documentoAtividade: DocumentoAtividade[]) => {
        if (!documentoAtividade) {
          this.mostrarTabela = false;
          this.msg = "Nenhum registro para a pesquisa selecionada";
        } else {
          this.dataSource.data = documentoAtividade;
          this.mostrarTabela = true;
        }
      },
      () => {
        this.msg = "Nenhum registro para a pesquisa selecionada";
        this.limpar();
      }
    );
  }

  atualizar(documentoAtividade: DocumentoAtividade) {
    this.router.navigate(["/documentoatividade/cadastrar"], {
      queryParams: { idDocumentoAtividade: documentoAtividade.id }
    });
  }

  deletar(documentoAtividade: DocumentoAtividade) {
    this.chamaCaixaDialogo(documentoAtividade);
  }

  chamaCaixaDialogo(documentoAtividade: DocumentoAtividade) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir o documento da atividade?`,
      textoConfirma: "SIM",
      textoCancela: "NÃO"
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.documentoAtividadeService
          .excluir(documentoAtividade.id)
          .subscribe(() => {
            this.atividade.id = null;
            this.consultar();
          });
      } else {
        dialogRef.close();
      }
    });
  }
}
