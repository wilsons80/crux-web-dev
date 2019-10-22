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

  atividadesAluno: AtividadeAluno;
  avaliacoesAluno: AvaliacaoAluno[];
  avaliacao: Avaliacao;
  notaAvaliacao: NotaAvaliacao;

  avaliacaoAluno: AvaliacaoAluno = new AvaliacaoAluno();

  notasAvaliacao = [
    { id: 1, tipo: NotaAvaliacao.INACEITAVEL, descricao: "Inaceitável - Dê o grau 1 se você achar nenhuma evidência da competência" },
    { id: 2, tipo: NotaAvaliacao.INSATISFATORIO, descricao: "Insatisfatório - Dê o grau 2 se você achar pouca a evidência da competência" },
    { id: 3, tipo: NotaAvaliacao.INDUSTRIAS, descricao: "Médio - Dê o grau 3 se você achar média a evidência da competência" },
    { id: 5, tipo: NotaAvaliacao.EXCELENTE, descricao: "Excelente -  Dê o grau 5 se você achar forte a evidência da competência" },
    { id: 4, tipo: NotaAvaliacao.OUTRO, descricao: "Bom - Dê o grau 4 se você achar boa a evidência da competência" },
  ]
  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private avaliacaoAlunoService: AvaliacaoAlunoService,
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

    this.avaliacaoAlunoService.getAll().subscribe((avaliacoesAluno: AvaliacaoAluno[]) => {
      this.avaliacoesAluno = avaliacoesAluno;
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
