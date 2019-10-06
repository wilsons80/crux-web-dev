import { Questionario } from './../../../core/questionario';
import { PessoaFisica } from './../../../core/pessoa-fisica';
import { Location } from '@angular/common';
import { Talento } from 'src/app/core/talento';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/core/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { FaltasFuncionarioService } from 'src/app/services/faltas-funcionario/faltas-funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FaltasFuncionario } from 'src/app/core/faltas-funcionario';
import { TalentosService } from 'src/app/services/talentos/talentos.service';
import { PessoaFisicaService } from 'src/app/services/pessoa-fisica/pessoa-fisica.service';
import { QuestionarioService } from 'src/app/services/questionario/questionario.service';

@Component({
  selector: 'app-cadastrar-talento',
  templateUrl: './cadastrar-talento.component.html',
  styleUrls: ['./cadastrar-talento.component.css']
})
export class CadastrarTalentoComponent implements OnInit {

  pessoas: PessoaFisica[];
  talento: Talento = new Talento();
  questionarios: Questionario [];

  isAtualizar: boolean = false;

  constructor(
    private questionarioService: QuestionarioService,
    private talentosService: TalentosService,
    private pessoaFisicaService: PessoaFisicaService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toastService:ToastService
  ) { }

  ngOnInit() {
    this.talento.questionario = new Questionario();
    this.talento.pessoasFisica = new PessoaFisica();

    this.questionarioService.getAll().subscribe((questionarios: Questionario[]) => {
      this.questionarios = questionarios;
    });
    
    this.pessoaFisicaService.getAll().subscribe((pessoas: PessoaFisica[]) => {
      this.pessoas = pessoas;
    });

    let idTalento: number;
    idTalento = this.route.snapshot.queryParams.idTalento ? this.route.snapshot.queryParams.idTalento : null;
    if (idTalento) {
      this.isAtualizar = true;
      this.talentosService.getById(idTalento).subscribe((talento: Talento) => {
        this.talento = talento;
      });
    }

  }
  cadastrar() {
    this.talentosService.cadastrar(this.talento).subscribe(() => {
      this.router.navigate(['talento']);
      this.toastService.showSucesso("Talento cadastrado com sucesso");
    });
  }

  limpar() {
    this.talento = new Talento();
  }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.talentosService.alterar(this.talento).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Talento atualizado com sucesso");
    });

  }



}
