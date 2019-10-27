import { UniformeEntregeAlunoService } from './../../services/uniforme-entregue-aluno/uniforme-entrege-aluno.service';
import { UniformeAluno } from 'src/app/core/uniforme-aluno';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { Aluno } from 'src/app/core/aluno';
import { Atividade } from 'src/app/core/atividade';
import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-uniforme-entregue-aluno',
  templateUrl: './uniforme-entregue-aluno.component.html',
  styleUrls: ['./uniforme-entregue-aluno.component.css']
})
export class UniformeEntregueAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  alunos: Aluno[];
  aluno: Aluno = new Aluno();

  atividades: Atividade[];
  atividade: Atividade = new Atividade();

  msg: string;
  perfilAcesso: Acesso;

  mostrarTabela = false;

  displayedColumns: string[] = ['aluno', 'uniforme', 'dataUniformeEntregue', 'qtdUniformeEntregue',
                                'atividade', 'dataInicioAtividade', 'dataCadastroAtividade', 'acoes'];

  dataSource: MatTableDataSource<UniformeAluno> = new MatTableDataSource();

  constructor(
    private uniformeEntregeAlunoService: UniformeEntregeAlunoService,
    private atividadeService: AtividadeService,
    private alunoService: AlunoService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;

    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    });

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    });

    this.consultar();
  }

  limpar() {
    this.mostrarTabela = false;
    this.aluno = null;
    this.atividade = null;
    this.dataSource.data = [];
  }


  atualizar(uniformeAluno: UniformeAluno) {
    this.router.navigate(['/uniformeentregue/cadastrar'], { queryParams: { id: uniformeAluno.id } });
  }

  deletar(auniformeAluno: UniformeAluno) {
    this.chamaCaixaDialogo(auniformeAluno);
  }

  chamaCaixaDialogo(uniformeAluno: UniformeAluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir a entregue de uniforme ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.uniformeEntregeAlunoService.excluir(uniformeAluno.id).subscribe(() => {
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    });
  }

  consultar() {
    this.uniformeEntregeAlunoService.getAllFiltro(this.aluno.id, this.atividade.id).subscribe((uniformeAluno: UniformeAluno[]) => {
      this.dataSource.data = uniformeAluno ? uniformeAluno : [];
      this.verificaMostrarTabela(uniformeAluno);
    });
  }

  verificaMostrarTabela(uniformeAluno: UniformeAluno[]) {
    if (!uniformeAluno || uniformeAluno.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum uniforme entregue para alunos.';
    } else {
      this.mostrarTabela = true;
    }
  }

}
