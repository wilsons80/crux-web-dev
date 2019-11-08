import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/core/atividade';
import { Acesso } from 'src/app/core/acesso';
import { ProdutosAtividade } from 'src/app/core/produtos-atividade';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ProdutosAtividadeService } from 'src/app/services/produtos-atividade/produtos-atividade.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-produtos-atividade',
  templateUrl: './produtos-atividade.component.html',
  styleUrls: ['./produtos-atividade.component.css']
})
export class ProdutosAtividadeComponent implements OnInit {
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
    "valorProduto",
    "acoes"
  ];
  dataSource: MatTableDataSource<ProdutosAtividade> = new MatTableDataSource();

  constructor(
    private atividadeService: AtividadeService,
    private produtosAtividadeService: ProdutosAtividadeService,
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

    this.produtosAtividadeService.getAll().subscribe((produtosAtividade: ProdutosAtividade[]) => {
      this.dataSource.data = produtosAtividade;
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
    this.produtosAtividadeService.getPorAtividade(this.atividade.id).subscribe(
      (produtosAtividade: ProdutosAtividade[]) => {
        if (!ProdutosAtividade) {
          this.mostrarTabela = false;
          this.msg = "Nenhum registro para a pesquisa selecionada";
        } else {
          this.dataSource.data = produtosAtividade;
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

  atualizar(produtosAtividade: ProdutosAtividade) {
    this.router.navigate(["/produtosatividade/cadastrar"], {
      queryParams: { idProdutoAtividade: produtosAtividade.id }
    });
  }

  deletar(produtosAtividade: ProdutosAtividade) {
    this.chamaCaixaDialogo(produtosAtividade);
  }

  chamaCaixaDialogo(produtosAtividade: ProdutosAtividade) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o produto da atividade?`,
      textoConfirma: "SIM",
      textoCancela: "NÃO"
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.produtosAtividadeService
          .excluir(produtosAtividade.id)
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
