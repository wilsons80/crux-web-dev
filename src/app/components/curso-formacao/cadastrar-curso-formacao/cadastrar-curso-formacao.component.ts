import { CursoFormacao } from 'src/app/core/curso-formacao';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Metas } from 'src/app/core/metas';
import { Iniciativa } from 'src/app/core/iniciativa';
import { IniciativaService } from 'src/app/services/iniciativa/iniciativa.service';
import { MetasService } from 'src/app/services/metas/metas.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { CursoFormacaoService } from 'src/app/services/curso-formacao/curso-formacao.service';

@Component({
  selector: 'app-cadastrar-curso-formacao',
  templateUrl: './cadastrar-curso-formacao.component.html',
  styleUrls: ['./cadastrar-curso-formacao.component.css']
})
export class CadastrarCursoFormacaoComponent implements OnInit {

  pessoaFisica: PessoaFisica[];
  cursoFormacao: CursoFormacao = new CursoFormacao();

  isAtualizar: boolean = false;

  constructor(
    private cursoFormacaoService: CursoFormacaoService,
    
    //TODOs private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) { }


  ngOnInit() {
   

    let idIniciativa: number;
    idIniciativa = this.route.snapshot.queryParams.idIniciativa ? this.route.snapshot.queryParams.idIniciativa : null;
    if (idIniciativa) {
      this.isAtualizar = true;
      this.cursoFormacaoService.getById(idIniciativa).subscribe((cursoFormacao: CursoFormacao) => {
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
