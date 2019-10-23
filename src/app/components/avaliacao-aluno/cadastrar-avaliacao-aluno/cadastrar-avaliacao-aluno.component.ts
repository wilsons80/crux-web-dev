import { AvaliacaoAtividadeService } from 'src/app/services/avaliacao-atividade/avaliacao-atividade.service';
import { AtividadeAlunoService } from './../../../services/atividade-aluno/atividade-aluno.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { Avaliacao } from 'src/app/core/avaliacao';
import { AvaliacaoAlunoService } from 'src/app/services/avaliacao-aluno/avaliacao-aluno.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AvaliacaoAluno } from './../../../core/avaliacao-aluno';
import { NotaAvaliacao } from './../../../core/nota-avaliacao';

@Component({
  selector: 'app-cadastrar-avaliacao-aluno',
  templateUrl: './cadastrar-avaliacao-aluno.component.html',
  styleUrls: ['./cadastrar-avaliacao-aluno.component.css']
})
export class CadastrarAvaliacaoAlunoComponent implements OnInit {

  atividadesAluno: AtividadeAluno[];
  avaliacoes: Avaliacao[];
  avaliacao: Avaliacao;
  notaAvaliacao: NotaAvaliacao;

  avaliacaoAluno: AvaliacaoAluno = new AvaliacaoAluno();

  notasAvaliacao = [
    { id: 1, tipo: NotaAvaliacao.INACEITAVEL, descricao: "INACEITÁVEL - DÊ O GRAU 1 SE VOCÊ ACHAR NENHUMA EVIDÊNCIA DA COMPETÊNCIA" },
    { id: 2, tipo: NotaAvaliacao.INSATISFATORIO, descricao: "INSATISFATÓRIO - DÊ O GRAU 2 SE VOCÊ ACHAR POUCA A EVIDÊNCIA DA COMPETÊNCIA" },
    { id: 3, tipo: NotaAvaliacao.INDUSTRIAS, descricao: "MÉDIO - DÊ O GRAU 3 SE VOCÊ ACHAR MÉDIA A EVIDÊNCIA DA COMPETÊNCIA" },
    { id: 5, tipo: NotaAvaliacao.EXCELENTE, descricao: "EXCELENTE -  DÊ O GRAU 5 SE VOCÊ ACHAR FORTE A EVIDÊNCIA DA COMPETÊNCIA" },
    { id: 4, tipo: NotaAvaliacao.OUTRO, descricao: "BOM - DÊ O GRAU 4 SE VOCÊ ACHAR BOA A EVIDÊNCIA DA COMPETÊNCIA" },
  ]
  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private avaliacaoAlunoService: AvaliacaoAlunoService,
    private avaliacaoAtividadeService: AvaliacaoAtividadeService,
    private atividadeAlunoService: AtividadeAlunoService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {
  }


  ngOnInit() {

    this.avaliacaoAluno.atividadesAluno = new AtividadeAluno();
    this.avaliacaoAluno.avaliacao = new Avaliacao();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.avaliacaoAtividadeService.getAll().subscribe((avaliacoes: Avaliacao[]) => {
      this.avaliacoes = avaliacoes;
    })

    this.atividadeAlunoService.getAll().subscribe((atividadesAluno: AtividadeAluno[]) => {
      this.atividadesAluno = atividadesAluno;
    })

    let idAvaliacaoAluno: number;
    idAvaliacaoAluno = this.activatedRoute.snapshot.queryParams.idAvaliacaoAluno ? this.activatedRoute.snapshot.queryParams.idAvaliacaoAluno : null;
    if (idAvaliacaoAluno) {
      this.isAtualizar = true;
      this.avaliacaoAlunoService.getById(idAvaliacaoAluno).subscribe((avaliacaoAluno: AvaliacaoAluno) => {
        this.avaliacaoAluno = avaliacaoAluno
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
    this.avaliacaoAlunoService.cadastrar(this.avaliacaoAluno).subscribe(() => {
      this.router.navigate(['avaliacaoaluno']);
      this.toastService.showSucesso("Avaliação aluno cadastrada com sucesso");
    });
  }

  limpar() {
    this.avaliacaoAluno = new AvaliacaoAluno();
  }

  cancelar() {
    this.router.navigate(['avaliacaoaluno']);
  }


  atualizar() {
    this.avaliacaoAlunoService.alterar(this.avaliacaoAluno).subscribe(() => {
      this.router.navigate(['avaliacaoaluno']);
      this.toastService.showSucesso("Avaliação aluno atualizado com sucesso");
    });

  }

}
