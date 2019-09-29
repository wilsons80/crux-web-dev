import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoFormacao } from 'src/app/core/curso-formacao';
import { CursoFormacaoService } from 'src/app/services/curso-formacao/curso-formacao.service';
import { PessoaFisicaService } from 'src/app/services/pessoa-fisica/pessoa-fisica.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PessoaFisica } from './../../../core/pessoa-fisica';

@Component({
  selector: 'app-cadastrar-curso-formacao',
  templateUrl: './cadastrar-curso-formacao.component.html',
  styleUrls: ['./cadastrar-curso-formacao.component.css']
})
export class CadastrarCursoFormacaoComponent implements OnInit {

  cursoFormacao: CursoFormacao = new CursoFormacao();
  listaPessoaFisica:PessoaFisica[];

  isAtualizar: boolean = false;

  constructor(
    private cursoFormacaoService: CursoFormacaoService,
    private pessoaFisicaService: PessoaFisicaService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) { }


  ngOnInit() {
    this.pessoaFisicaService.getAll().subscribe((lista:PessoaFisica[]) => {
      this.listaPessoaFisica = lista;
    });

    let idCursoFormacao: number;
    idCursoFormacao = this.route.snapshot.queryParams.idCursoFormacao ? this.route.snapshot.queryParams.idCursoFormacao : null;
    if (idCursoFormacao) {
      this.isAtualizar = true;
      this.cursoFormacaoService.getById(idCursoFormacao).subscribe((cursoFormacao: CursoFormacao) => {
        this.cursoFormacao = cursoFormacao
      });
    }

  }
  cadastrar() {
    this.cursoFormacaoService.cadastrar(this.cursoFormacao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Curso de Formação cadastrado com sucesso");
    });
  }

  limpar() {
    this.cursoFormacao = new CursoFormacao();
   }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.cursoFormacaoService.alterar(this.cursoFormacao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Curso de Formação cadastrado com sucesso");
    });

  }

}
