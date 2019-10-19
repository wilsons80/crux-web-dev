import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Solucoes } from 'src/app/core/solucoes';
import { SolucaoAtendimentoService } from 'src/app/services/solucao-atendimento/solucao-atendimento.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-solucao-atendimento',
  templateUrl: './solucao-atendimento.component.html',
  styleUrls: ['./solucao-atendimento.component.css']
})
export class SolucaoAtendimentoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  solucoes: Solucoes[];
  mostrarTabela = false;
  solucao: Solucoes = new Solucoes();
  msg: string;

  displayedColumns: string[] = ['descricao', 'acoes'];
  dataSource: MatTableDataSource<Solucoes> = new MatTableDataSource();

  perfilAcesso: Acesso;


  constructor(
    private solucaoService: SolucaoAtendimentoService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

  this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.solucao = new Solucoes();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.solucao.id) {
      this.solucaoService.getById(this.solucao.id).subscribe((retorno: Solucoes) => {
        if (!retorno) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada";
        } else {
          this.dataSource.data = [retorno];
          this.mostrarTabela = true;
        }
      });
    } else {
      this.getAll();
    }
  }


  atualizar(retorno: Solucoes) {
    this.router.navigate(['/solucaoatendimento/cadastrar'], { queryParams: { id: retorno.id } });
  }

  deletar(retorno: Solucoes) {
    this.chamaCaixaDialogo(retorno);
  }

  chamaCaixaDialogo(retorno: Solucoes) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a solução de atendimento: ${retorno.descricao}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.solucaoService.excluir(retorno.id).subscribe(() => {
          this.solucao.id = null;
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.solucaoService.getAll().subscribe((retorno: Solucoes[]) => {
      this.solucoes = retorno;
      this.dataSource.data = retorno ? retorno : [];
      this.verificaMostrarTabela(retorno);
    });
  }

  verificaMostrarTabela(retorno: Solucoes[]) {
    if (!retorno || retorno.length === 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma solução de atendimento cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }

}
