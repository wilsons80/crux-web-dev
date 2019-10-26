import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { Acesso } from 'src/app/core/acesso';
import { AtividadeAlunoService } from 'src/app/services/atividade-aluno/atividade-aluno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Aluno } from 'src/app/core/aluno';
import { Atividade } from 'src/app/core/atividade';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';

import _ from 'lodash';


@Component({
  selector: 'app-atividade-aluno',
  templateUrl: './atividade-aluno.component.html',
  styleUrls: ['./atividade-aluno.component.css']
})
export class AtividadeAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  atividadesAlunos: AtividadeAluno[];
  atividadeAluno: AtividadeAluno = new AtividadeAluno();

  alunos: Aluno[];
  aluno:Aluno;

  atividades:Atividade[];
  atividade:Atividade;
  

  msg: string;
  perfilAcesso: Acesso;

  mostrarTabela = false;

  displayedColumns: string[] = ['aluno', 'atividade', 'dataCadastroAtividade','dataInicioAtividade', 'acoes'];
  dataSource: MatTableDataSource<AtividadeAluno> = new MatTableDataSource();

  constructor(
    private atividadeAlunoService: AtividadeAlunoService,
    private atividadeService: AtividadeService,
    private alunoService: AlunoService,

    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;

    this.alunoService.getAll().subscribe((alunos:Aluno[]) => {
      this.alunos = alunos;
    })

    this.atividadeService.getAll().subscribe((atividades:Atividade[]) => {
      this.atividades = atividades;
    })

    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.aluno = null;
    this.atividade = null;
    this.dataSource.data = [];
  }

  consultar() {

    if(!this.aluno && !this.atividade) {this.getAll()}

    if(this.aluno && !this.atividade) {this.getPorAluno()}
   
    if(!this.aluno && this.atividade) {this.getPorAtividade()}
   
    if(this.aluno && this.atividade) {this.getPorAlunoEAtividade()}

  }
  getPorAlunoEAtividade() {
    this.atividadeAlunoService.getByAlunoEAtividade(this.aluno.id, this.atividade.id).subscribe((atividadeAluno: AtividadeAluno[]) => {
    
      if (_.isEmpty(atividadeAluno)) {
        this.mostrarTabela = false
        this.msg = "Nenhum registro para a pesquisa selecionada"
      } else {
        this.dataSource.data = atividadeAluno;
        this.mostrarTabela = true;
      }
    })
  }

  getPorAtividade() {
    this.atividadeAlunoService.getByAtividade(this.atividade.id).subscribe((atividadeAluno: AtividadeAluno[]) => {
    
      if (_.isEmpty(atividadeAluno)) {
        this.mostrarTabela = false
        this.msg = "Nenhum registro para a pesquisa selecionada"
      } else {
        this.dataSource.data = atividadeAluno;
        this.mostrarTabela = true;
      }
    })
    
  }
  getPorAluno() {
    this.atividadeAlunoService.getByAluno(this.aluno.id).subscribe((atividadeAluno: AtividadeAluno[]) => {
    
      if (_.isEmpty(atividadeAluno)) {
        this.mostrarTabela = false
        this.msg = "Nenhum registro para a pesquisa selecionada"
      } else {
        this.dataSource.data = atividadeAluno;
        this.mostrarTabela = true;
      }
    })
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
