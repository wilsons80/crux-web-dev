import { EncaminhamentoAlunoService } from './../../../services/encaminhamento-aluno/encaminhamento-aluno.service';
import { EntidadesSociais } from 'src/app/core/entidades-sociais';
import { Aluno } from './../../../core/aluno';
import { Component, OnInit } from '@angular/core';
import { EncaminhamentoAluno } from 'src/app/core/encaminhamento-aluno';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { EntidadeSocialService } from 'src/app/services/entidade-social/entidade-social.service';
import { Empresa } from 'src/app/core/empresa';

@Component({
  selector: 'cadastrar-encaminhamento-aluno',
  templateUrl: './cadastrar-encaminhamento-aluno.component.html',
  styleUrls: ['./cadastrar-encaminhamento-aluno.component.css']
})
export class CadastrarEncaminhamentoAlunoComponent implements OnInit {

  alunos: Aluno[];
  entidadesSociais: EntidadesSociais[];

  encaminhamentoAluno: EncaminhamentoAluno = new EncaminhamentoAluno();

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private alunoService: AlunoService,
    private entidadeSocialService: EntidadeSocialService,
    private encaminhamentoAlunoService: EncaminhamentoAlunoService
  ) { }


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

    this.entidadeSocialService.getAll().subscribe((entidadesSociais: EntidadesSociais[]) => {
      this.entidadesSociais = entidadesSociais;
    });

    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.encaminhamentoAlunoService.getById(id).subscribe((encaminhamentoAluno: EncaminhamentoAluno) => {
        this.encaminhamentoAluno = encaminhamentoAluno;
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
    this.encaminhamentoAlunoService.cadastrar(this.encaminhamentoAluno).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Encaminhamento aluno cadastrado com sucesso');
    });
  }


  limpar() {
    this.encaminhamentoAluno = new EncaminhamentoAluno();
    this.encaminhamentoAluno.aluno = new Aluno();
    this.encaminhamentoAluno.entidadeSocial = new EntidadesSociais();
    this.encaminhamentoAluno.entidadeSocial.empresa = new Empresa();
  }

  cancelar() {
    this.location.back();
  }


  atualizar() {
    this.encaminhamentoAlunoService.alterar(this.encaminhamentoAluno).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Encaminhamento aluno atualizado com sucesso');
    });
  }

}
