import { UniformeAluno } from 'src/app/core/uniforme-aluno';
import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/core/aluno';
import { Atividade } from 'src/app/core/atividade';
import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { AtividadeAlunoService } from 'src/app/services/atividade-aluno/atividade-aluno.service';
import { UniformeEntregeAlunoService } from 'src/app/services/uniforme-entregue-aluno/uniforme-entrege-aluno.service';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import * as _ from 'lodash';


@Component({
  selector: 'app-cadastrar-uniforme-entregue-aluno',
  templateUrl: './cadastrar-uniforme-entregue-aluno.component.html',
  styleUrls: ['./cadastrar-uniforme-entregue-aluno.component.css']
})
export class CadastrarUniformeEntregueAlunoComponent implements OnInit {

  uniformeAluno: UniformeAluno = new UniformeAluno();

  alunos: Aluno[];
  atividades: Atividade[];

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  constructor(
    private uniformeAlunoService: UniformeEntregeAlunoService,
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

    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.uniformeAlunoService.getById(id).subscribe((uniformeAluno: UniformeAluno) => {
        this.uniformeAluno = uniformeAluno;
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
    this.uniformeAlunoService.cadastrar(this.uniformeAluno).subscribe(() => {
      this.router.navigate(['uniformeentregue']);
      this.toastService.showSucesso('Entrega de uniforme cadastrada com sucesso');
    });
  }

  limpar() {
    this.uniformeAluno.atividadesAluno = new AtividadeAluno();
    this.uniformeAluno.atividadesAluno.atividade = new Atividade();
    this.uniformeAluno.atividadesAluno.aluno = new Aluno();
  }

  cancelar() {
    this.router.navigate(['uniformeentregue']);
  }

  atualizar() {
    this.uniformeAlunoService.alterar(this.uniformeAluno).subscribe(() => {
      this.router.navigate(['uniformeentregue']);
      this.toastService.showSucesso('Entrega de uniforme atualizada com sucesso');
    });
  }

  mostrarDadosAluno(idAluno) {
    this.uniformeAluno.atividadesAluno.aluno = _.find(this.alunos, (a: Aluno) => a.id === idAluno);
  }

  mostrarDadosAtividade(idAtividade) {
    this.uniformeAluno.atividadesAluno.atividade = _.find(this.atividades, (a: Atividade) => a.id === idAtividade);
  }

}
