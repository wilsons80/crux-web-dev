import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { Acesso } from 'src/app/core/acesso';
import { AtividadeAlunoService } from 'src/app/services/atividade-aluno/atividade-aluno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-atividade-aluno',
  templateUrl: './atividade-aluno.component.html',
  styleUrls: ['./atividade-aluno.component.css']
})
export class AtividadeAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  atividadesAlunos: AtividadeAluno[];
  atividadeAluno: AtividadeAluno = new AtividadeAluno();
  msg: string;
  perfilAcesso: Acesso;

  mostrarTabela = false;

  displayedColumns: string[] = ['aluno', 'atividade', 'dataCadastroAtividade','dataInicioAtividade', 'acoes'];
  dataSource: MatTableDataSource<AtividadeAluno> = new MatTableDataSource();

  constructor(
    private atividadeAlunoService: AtividadeAlunoService,
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
    this.atividadeAluno = new AtividadeAluno()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.atividadeAluno.id) {
      this.atividadeAlunoService.getById(this.atividadeAluno.id).subscribe((atividadeAluno: AtividadeAluno) => {
        if (!atividadeAluno) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [atividadeAluno];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(atividadeAluno: AtividadeAluno) {
    this.router.navigate(['/atividadealuno/cadastrar'], { queryParams: { idAtividadeAluno: atividadeAluno.id } });
  }

  deletar(atividadeAluno: AtividadeAluno) {
    this.chamaCaixaDialogo(atividadeAluno);
  }

  chamaCaixaDialogo(atividadeAluno: AtividadeAluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a atividadeAluno?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.atividadeAlunoService.excluir(atividadeAluno.id).subscribe(() => {
          this.atividadeAluno.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.atividadeAlunoService.getAll().subscribe((atividadesAlunos: AtividadeAluno[]) => {
      this.atividadesAlunos = atividadesAlunos;
      this.dataSource.data = atividadesAlunos ? atividadesAlunos : [];
      this.verificaMostrarTabela(atividadesAlunos);
    })
  }

  verificaMostrarTabela(atividadesAlunos: AtividadeAluno[]) {
    if (!atividadesAlunos || atividadesAlunos.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma Atividade Aluno cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }

}
