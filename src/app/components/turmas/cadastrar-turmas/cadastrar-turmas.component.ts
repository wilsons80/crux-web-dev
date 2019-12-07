import { NiveisTurmas } from './../../../core/niveis-turmas';
import { Programa } from './../../../core/programa';
import { Component, OnInit } from '@angular/core';
import { Turmas } from 'src/app/core/turmas';
import { Projeto } from 'src/app/core/projeto';
import { Unidade } from 'src/app/core/unidade';
import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TurmasService } from 'src/app/services/turmas/turmas.service';

@Component({
  selector: 'cadastrar-turmas',
  templateUrl: './cadastrar-turmas.component.html',
  styleUrls: ['./cadastrar-turmas.component.css']
})
export class CadastrarTurmasComponent implements OnInit {

  turma: Turmas = new Turmas();

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  constructor(
    private turmaService: TurmasService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.initObjetos();
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.turmaService.getById(id).subscribe((turma: Turmas) => {
        this.turma = turma;
      });
    }

  }

  initObjetos() {
    this.turma = new Turmas();
    this.turma.programa = new Programa();
    this.turma.projeto = new Projeto();
    this.turma.unidade = new Unidade();
    this.turma.niveisTurma = new NiveisTurmas();
    this.turma.colaboradores = [];
    this.turma.oficinas = [];
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.turmaService.cadastrar(this.turma).subscribe(() => {
      this.router.navigate(['turmas']);
      this.toastService.showSucesso('Turma cadastrada com sucesso');
    });
  }

  limpar() {
    this.initObjetos();
  }

  cancelar() {
    this.router.navigate(['turmas']);
  }


  atualizar() {
    this.turmaService.alterar(this.turma).subscribe(() => {
      this.router.navigate(['turmas']);
      this.toastService.showSucesso('Turma atualizada com sucesso');
    });

  }


}
