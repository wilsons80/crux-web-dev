import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { AvaliacaoAluno } from 'src/app/core/avaliacao-aluno';
import { AvaliacaoAlunoService } from 'src/app/services/avaliacao-aluno/avaliacao-aluno.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-avaliacao-aluno',
  templateUrl: './avaliacao-aluno.component.html',
  styleUrls: ['./avaliacao-aluno.component.css']
})
export class AvaliacaoAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  avaliacoesAluno: AvaliacaoAluno[];
  mostrarTabela: boolean = false;
  avaliacaoAluno: AvaliacaoAluno = new AvaliacaoAluno();
  msg: string;
  perfilAcesso: Acesso;

  displayedColumns: string[] = ['aluno', 'dataAvaliacao', 'avaliacao', 'notaAvaliacao', 'acoes'];
  dataSource: MatTableDataSource<AvaliacaoAluno> = new MatTableDataSource();

  constructor(
    private avaliacaoAlunoService: AvaliacaoAlunoService,
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
    this.avaliacaoAluno = new AvaliacaoAluno()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.avaliacaoAluno.id) {
      this.avaliacaoAlunoService.getById(this.avaliacaoAluno.id).subscribe((avaliacaoAluno: AvaliacaoAluno) => {
        if (!AvaliacaoAluno) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [avaliacaoAluno];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }


  atualizar(avaliacaoAluno: AvaliacaoAluno) {
    this.router.navigate(['/avaliacaoaluno/cadastrar'], { queryParams: { idAvaliacaoAluno: avaliacaoAluno.id } });
  }

  deletar(avaliacaoAluno: AvaliacaoAluno) {
    this.chamaCaixaDialogo(avaliacaoAluno);
  }

  chamaCaixaDialogo(avaliacaoAluno: AvaliacaoAluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o avaliação ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.avaliacaoAlunoService.excluir(avaliacaoAluno.id).subscribe(() => {
          this.avaliacaoAluno.id = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.avaliacaoAlunoService.getAll().subscribe((avaliacaoAlunos: AvaliacaoAluno[]) => {
      this.avaliacoesAluno = avaliacaoAlunos;
      this.dataSource.data = avaliacaoAlunos ? avaliacaoAlunos : [];
      this.verificaMostrarTabela(avaliacaoAlunos);
    })
  }

  verificaMostrarTabela(avaliacaoAlunos: AvaliacaoAluno[]) {
    if (!avaliacaoAlunos || avaliacaoAlunos.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma avaliação cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }

}
