import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Aluno } from 'src/app/core/aluno';
import { Atividade } from 'src/app/core/atividade';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { AtividadeAlunoService } from 'src/app/services/atividade-aluno/atividade-aluno.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AlunoService } from './../../../services/aluno/aluno.service';

@Component({
  selector: 'app-cadastrar-atividade-aluno',
  templateUrl: './cadastrar-atividade-aluno.component.html',
  styleUrls: ['./cadastrar-atividade-aluno.component.css']
})
export class CadastrarAtividadeAlunoComponent implements OnInit {

  atividadeAluno: AtividadeAluno = new AtividadeAluno();
  alunos: Aluno[];
  atividades: Atividade[];

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private atividadeAlunoService: AtividadeAlunoService,
    private alunoService: AlunoService,
    private atividadeService: AtividadeService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {
  }


  ngOnInit() {

    this.atividadeAluno.aluno = new Aluno();
    this.atividadeAluno.atividade = new Atividade();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    })

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    })

    let idAtividadeAluno: number;
    idAtividadeAluno = this.activatedRoute.snapshot.queryParams.idAtividadeAluno ? this.activatedRoute.snapshot.queryParams.idAtividadeAluno : null;
    if (idAtividadeAluno) {
      this.isAtualizar = true;
      this.atividadeAlunoService.getById(idAtividadeAluno).subscribe((atividadeAluno: AtividadeAluno) => {
        this.atividadeAluno = atividadeAluno
      });
    }

  }
  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.atividadeAlunoService.cadastrar(this.atividadeAluno).subscribe(() => {
      this.router.navigate(['atividadealuno']);
      this.toastService.showSucesso("Atividade aluno cadastrada com sucesso");
    });
  }

  limpar() {
    this.atividadeAluno = new AtividadeAluno();
  }

  cancelar() {
    this.router.navigate(['atividadealuno']);
  }


  atualizar() {
    this.atividadeAlunoService.alterar(this.atividadeAluno).subscribe(() => {
      this.router.navigate(['atividadealuno']);
      this.toastService.showSucesso("Atividade aluno atualizado com sucesso");
    });

  }

}
