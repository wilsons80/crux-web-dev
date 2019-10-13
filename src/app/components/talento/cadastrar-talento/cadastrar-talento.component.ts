import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Talento } from 'src/app/core/talento';
import { PessoaFisicaService } from 'src/app/services/pessoa-fisica/pessoa-fisica.service';
import { QuestionarioService } from 'src/app/services/questionario/questionario.service';
import { TalentosService } from 'src/app/services/talentos/talentos.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PessoaFisica } from './../../../core/pessoa-fisica';
import { Questionario } from './../../../core/questionario';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-cadastrar-talento',
  templateUrl: './cadastrar-talento.component.html',
  styleUrls: ['./cadastrar-talento.component.css']
})
export class CadastrarTalentoComponent implements OnInit {

  pessoas: PessoaFisica[];
  talento: Talento = new Talento();
  questionarios: Questionario[];

  isAtualizar: boolean = false;
  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private questionarioService: QuestionarioService,
    private talentosService: TalentosService,
    private pessoaFisicaService: PessoaFisicaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(this.perfilAcesso.insere === 'N'){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(this.perfilAcesso.altera === 'N'){
      this.mostrarBotaoAtualizar = false;
    }

    this.talento.questionario = new Questionario();
    this.talento.pessoasFisica = new PessoaFisica();

    this.questionarioService.getAll().subscribe((questionarios: Questionario[]) => {
      this.questionarios = questionarios;
    });

    this.pessoaFisicaService.getAll().subscribe((pessoas: PessoaFisica[]) => {
      this.pessoas = pessoas;
    });

    let idTalento: number;
    idTalento = this.activatedRoute.snapshot.queryParams.idTalento ? this.activatedRoute.snapshot.queryParams.idTalento : null;
    if (idTalento) {
      this.isAtualizar = true;
      this.talentosService.getById(idTalento).subscribe((talento: Talento) => {
        this.talento = talento;
      });
    }

  }
  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
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


  atualizar() {
    this.talentosService.alterar(this.talento).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Talento atualizado com sucesso");
    });

  }



}
