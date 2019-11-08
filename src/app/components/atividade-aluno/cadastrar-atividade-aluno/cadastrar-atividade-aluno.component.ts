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
import * as _ from 'lodash';

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
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

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

    this.limpar();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    });

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    });


    let idAtividadeAluno: number;
    idAtividadeAluno = this.activatedRoute.snapshot.queryParams.idAtividadeAluno ?
      this.activatedRoute.snapshot.queryParams.idAtividadeAluno : null;

    if (idAtividadeAluno) {
      this.isAtualizar = true;
      this.atividadeAlunoService.getById(idAtividadeAluno).subscribe((atividadeAluno: AtividadeAluno) => {
        this.atividadeAluno = atividadeAluno;
      });
    }
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) { return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }

  cadastrar() {
    if (!this.validarDatas() ) { return; }

    this.atividadeAlunoService.cadastrar(this.atividadeAluno).subscribe(() => {
      this.router.navigate(['atividadealuno']);
      this.toastService.showSucesso('Atividade aluno cadastrada com sucesso');
    });
  }

  validarDatas(): boolean {
    if (this.atividadeAluno.dataInicioAtividade.getTime() < new Date(this.atividadeAluno.atividade.dataInicio).getTime()) {
      this.toastService.showAlerta('A data de início informada não pode ser menor que a data de início da atividade selecionada.');
      return false;
    }

    if (this.atividadeAluno.atividade.dataFim) {
      if (this.atividadeAluno.dataInicioAtividade &&
        this.atividadeAluno.dataInicioAtividade.getTime() > new Date(this.atividadeAluno.atividade.dataFim).getTime()) {
        this.toastService.showAlerta('A data de início informada não pode ser menor que a data de início da atividade selecionada.');
        return false;
      }
    }

    if (this.atividadeAluno.atividade.dataFim &&
        this.atividadeAluno.dataDesvinculacao &&
        new Date(this.atividadeAluno.dataDesvinculacao).getTime() > new Date(this.atividadeAluno.atividade.dataFim).getTime()) {
      this.toastService.showAlerta('A data de desvinculação informada não pode ser maior que a data de fim da atividade selecionada.');
      return false;
    }

    if (this.atividadeAluno.dataDesvinculacao &&
        new Date(this.atividadeAluno.dataDesvinculacao).getTime() < new Date(this.atividadeAluno.atividade.dataInicio).getTime()) {
      this.toastService.showAlerta('A data de desvinculação informada não pode ser menor que a data de início da atividade selecionada.');
      return false;
    }

    return true;
  }


  limpar() {
    this.atividadeAluno = new AtividadeAluno();
    this.atividadeAluno.aluno = new Aluno();
    this.atividadeAluno.atividade = new Atividade();
  }

  cancelar() {
    this.router.navigate(['atividadealuno']);
  }


  atualizar() {
    if (!this.validarDatas() ) { return; }

    this.atividadeAlunoService.alterar(this.atividadeAluno).subscribe(() => {
      this.router.navigate(['atividadealuno']);
      this.toastService.showSucesso('Atividade aluno atualizado com sucesso');
    });

  }

  mostrarDadosAluno(idAluno) {
    this.atividadeAluno.aluno = _.cloneDeep(_.find(this.alunos, (a: Aluno) => a.id === idAluno));
  }

  mostrarDadosAtividade(idAtividade) {
    this.atividadeAluno.atividade = _.cloneDeep(_.find(this.atividades, (a: Atividade) => a.id === idAtividade));
  }

}
