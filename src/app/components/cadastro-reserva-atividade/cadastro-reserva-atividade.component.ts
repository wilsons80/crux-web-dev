import { CadastroReservaAtividade } from './../../core/cadastro-reserva-atividade';
import { CadastroReservaAtividadeService } from './../../services/cadastro-reserva-atividade/cadastro-reserva-atividade.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Atividade } from 'src/app/core/atividade';
import { ProdutosAtividade } from 'src/app/core/produtos-atividade';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ProdutosAtividadeService } from 'src/app/services/produtos-atividade/produtos-atividade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-cadastro-reserva-atividade',
  templateUrl: './cadastro-reserva-atividade.component.html',
  styleUrls: ['./cadastro-reserva-atividade.component.css']
})
export class CadastroReservaAtividadeComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaAtividade: Atividade[];
  mostrarTabela: boolean = false;
  msg: string;
  atividade: Atividade;

  perfilAcesso:PerfilAcesso;

  displayedColumns: string[] = [
    "id",
    "descricaoCadastroReserva",
    "atividade",
    "pessoa",
    "acoes"
  ];
  dataSource: MatTableDataSource<CadastroReservaAtividade> = new MatTableDataSource();

  constructor(
    private atividadeService: AtividadeService,
    private cadastroReservaAtividadeService: CadastroReservaAtividadeService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(this.perfilAcesso.altera === 'N' && this.perfilAcesso.deleta === 'N'){
      this.displayedColumns = [
        "id",
        "descricaoCadastroReserva",
        "atividade",
        "pessoa",
      ];
    }

    this.dataSource.paginator = this.paginator;
    this.atividadeService.getAll().subscribe((listaAtividade: Atividade[]) => {
      this.listaAtividade = listaAtividade;
    });
  }

  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];
    this.atividade = null
    this.msg = "";
  }

  consultar() {
    this.cadastroReservaAtividadeService.getPorAtividade(this.atividade.id).subscribe(
      (cadastroReservaAtividade: CadastroReservaAtividade[]) => {
        if (!ProdutosAtividade) {
          this.mostrarTabela = false;
          this.msg = "Nenhum registro para a pesquisa selecionada";
        } else {
          this.dataSource.data = cadastroReservaAtividade;
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

  atualizar(cadastroReservaAtividade: CadastroReservaAtividade) {
    this.router.navigate(["/cadastroreservaatividade/cadastrar"], {
      queryParams: { idCadastroReserva: cadastroReservaAtividade.id }
    });
  }

  deletar(cadastroReservaAtividade: CadastroReservaAtividade) {
    this.chamaCaixaDialogo(cadastroReservaAtividade);
  }

  chamaCaixaDialogo(cadastroReservaAtividade: CadastroReservaAtividade) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a reserva da atividade?`,
      textoConfirma: "SIM",
      textoCancela: "NÃO"
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.cadastroReservaAtividadeService
          .excluir(cadastroReservaAtividade.id)
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
