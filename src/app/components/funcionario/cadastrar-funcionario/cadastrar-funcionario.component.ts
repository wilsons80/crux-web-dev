import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Funcionario } from './../../../core/funcionario';
import { PessoaFisica } from './../../../core/pessoa-fisica';
import { FuncionarioService } from './../../../services/funcionario/funcionario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.css']
})
export class CadastrarFuncionarioComponent implements OnInit {

  pessoaFisica: PessoaFisica = new PessoaFisica();
  funcionario: Funcionario = new Funcionario();

  isAtualizar: boolean = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) {

  }

  ngOnInit() {
    this.funcionario.pessoasFisica = this.pessoaFisica;

    let idFuncionario: number;
    idFuncionario = this.route.snapshot.queryParams.idFuncionario ? this.route.snapshot.queryParams.idFuncionario : null;
    if (idFuncionario) {
      this.isAtualizar = true;
      this.funcionarioService.getById(idFuncionario).subscribe((funcionario: Funcionario) => {
        this.funcionario = funcionario;
      });
    }
  }

  cadastrar() {
    this.tratarDados();
    this.funcionarioService.cadastrar(this.funcionario).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Funcionário cadastrado com sucesso");
    })
  }

  tratarDados() {
    this.funcionario.pessoasFisica.cep = this.funcionario.pessoasFisica.cep ? this.retiraMascara(this.funcionario.pessoasFisica.cep.toString()) : null
    this.funcionario.pessoasFisica.celular = this.funcionario.pessoasFisica.celular ? this.retiraMascara(this.funcionario.pessoasFisica.celular.toString()) : null
    this.funcionario.pessoasFisica.cpf = this.funcionario.pessoasFisica.cpf ? this.retiraMascara(this.funcionario.pessoasFisica.cpf.toString()) : null
  }

  limpar() {
    this.funcionario = new Funcionario()
  }

  cancelar() {
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.funcionarioService.alterar(this.funcionario).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Funcionário atualizado com sucesso");
    });

  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }

}
