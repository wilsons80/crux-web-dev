import { Component, OnInit } from '@angular/core';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Aluno } from 'src/app/core/aluno';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-cadastar-aluno',
  templateUrl: './cadastar-aluno.component.html',
  styleUrls: ['./cadastar-aluno.component.css']
})
export class CadastarAlunoComponent implements OnInit {

  pessoaFisica: PessoaFisica = new PessoaFisica();
  aluno: Aluno = new Aluno();

  constructor(
    private alunoService: AlunoService,
    private location: Location,
    private toastService: ToastService
  ) {

  }

  ngOnInit() {
    this.aluno.pessoaFisica = this.pessoaFisica;
  }

  cadastrar() {
    this.tratarDados();
    this.alunoService.cadastrar(this.aluno).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Aluno cadastrado com sucesso');
    });
  }

  tratarDados() {
    this.aluno.pessoaFisica.cep     = this.aluno.pessoaFisica.cep ? this.retiraMascara(this.aluno.pessoaFisica.cep.toString()) : null;
    this.aluno.pessoaFisica.celular = this.aluno.pessoaFisica.celular ? this.retiraMascara(this.aluno.pessoaFisica.celular.toString()) : null;
    this.aluno.pessoaFisica.cpf     = this.aluno.pessoaFisica.cpf ? this.retiraMascara(this.aluno.pessoaFisica.cpf) : null;
  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }

}
