import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Questionario } from 'src/app/core/questionario';
import { QuestionarioService } from 'src/app/services/questionario/questionario.service';
import { ObjetivoService } from 'src/app/services/objetivo/objetivo.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Objetivo } from 'src/app/core/objetivo';

@Component({
  selector: 'app-cadastrar-questionario',
  templateUrl: './cadastrar-questionario.component.html',
  styleUrls: ['./cadastrar-questionario.component.css']
})
export class CadastrarQuestionarioComponent implements OnInit {

  questionario: Questionario = new Questionario();

  isAtualizar: boolean = false;

  tiposQuestionario = [
    {id: 1, tipo: "T", descricao: "TALENTO" },
    {id: 2, tipo: "G", descricao: "GRUPO FAMILIAR" },
    {id: 3, tipo: "O", descricao: "OUTRO" },
  ]
  constructor(
    private questionarioService: QuestionarioService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) {
  }


  ngOnInit() {

    let idQuestionario: number;
    idQuestionario = this.route.snapshot.queryParams.idQuestionario ? this.route.snapshot.queryParams.idQuestionario : null;
    if (idQuestionario) {
      this.isAtualizar = true;
      this.questionarioService.getById(idQuestionario).subscribe((ind: Questionario) => {
        this.questionario = ind;
      });
    }

  }
  cadastrar() {
    this.questionarioService.cadastrar(this.questionario).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Questionário cadastrado com sucesso");
    });
  }

  limpar() {
    this.questionario = new Questionario()
  }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.questionarioService.alterar(this.questionario).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Questionário atualizado com sucesso");
    });

  }

}
