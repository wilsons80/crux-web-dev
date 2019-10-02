import { ArquivoPessoaFisicaService } from './../../../services/arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Funcionario } from './../../../core/funcionario';
import { PessoaFisica } from './../../../core/pessoa-fisica';
import { FuncionarioService } from './../../../services/funcionario/funcionario.service';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import { FileUtils } from 'src/app/utils/file-utils';

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
    private toastService: ToastService,
    private arquivoPessoaFisicaService:ArquivoPessoaFisicaService,
    private fileUtils:FileUtils,
  ) {

  }

  ngOnInit() {
    this.funcionario.pessoasFisica = this.pessoaFisica;

    let idFuncionario: number;
    idFuncionario = this.route.snapshot.queryParams.idFuncionario ? this.route.snapshot.queryParams.idFuncionario : null;
    if (idFuncionario) {
      this.isAtualizar = true;
      this.funcionarioService.getById(idFuncionario).pipe(
        switchMap((funcionario: Funcionario) => {
          this.funcionario = funcionario;
          return this.arquivoPessoaFisicaService.get(funcionario.pessoasFisica.id)
        })
      ).subscribe((foto: any) => {
        foto = this.fileUtils.convertBufferArrayToBase64(foto);

        this.funcionario.pessoasFisica.foto = foto;
        this.funcionario.pessoasFisica.urlFoto = foto.changingThisBreaksApplicationSecurity;
      });
    }
  }


  cadastrar() {
    this.tratarDados();
    this.funcionarioService.cadastrar(this.funcionario).pipe(
      switchMap((funcionarioRetorno: Funcionario) => {
        if(this.funcionario.pessoasFisica.foto){
          return this.arquivoPessoaFisicaService.gravar(this.funcionario.pessoasFisica.foto, funcionarioRetorno.pessoasFisica.id)
        } else {
         return new Observable(obs => obs.next());
        }
      })

    ).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Funcionário cadastrado com sucesso');
    })
  }

  tratarDados() {
    this.funcionario.pessoasFisica.cep = this.funcionario.pessoasFisica.cep ? this.retiraMascara(this.funcionario.pessoasFisica.cep.toString()) : null
    this.funcionario.pessoasFisica.celular = this.funcionario.pessoasFisica.celular ? this.retiraMascara(this.funcionario.pessoasFisica.celular.toString()) : null
    this.funcionario.pessoasFisica.cpf = this.funcionario.pessoasFisica.cpf ? this.retiraMascara(this.funcionario.pessoasFisica.cpf.toString()) : null
    this.funcionario.pessoasFisica.telefoneResidencial = this.funcionario.pessoasFisica.telefoneResidencial ? this.retiraMascara(this.funcionario.pessoasFisica.telefoneResidencial.toString()) : null
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
    this.tratarDados();
    this.funcionarioService.alterar(this.funcionario).pipe(
    
      switchMap((funcionario: Funcionario) => {
        if (this.funcionario.pessoasFisica.foto){
          return this.arquivoPessoaFisicaService.alterar(this.funcionario.pessoasFisica.foto, funcionario.pessoasFisica.id)
        } else {
         return new Observable(obs => obs.next());
        }
      })

    ).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Funcionário atualizado com sucesso');
    });

  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }

}
