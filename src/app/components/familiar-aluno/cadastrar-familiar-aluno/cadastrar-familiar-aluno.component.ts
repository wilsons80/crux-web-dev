import { FamiliarAlunoService } from 'src/app/services/familiar-aluno/familiar-aluno.service';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/core/aluno';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { MatTableDataSource } from '@angular/material';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { FormControl } from '@angular/forms';
import { startWith, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FileUtils } from 'src/app/utils/file-utils';
import { GrausInstrucao } from 'src/app/core/graus-instrucao';
import { Familiares } from 'src/app/core/familiares';
import { ArquivoPessoaFisicaService } from 'src/app/services/arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';

@Component({
  selector: 'app-cadastrar-familiar-aluno',
  templateUrl: './cadastrar-familiar-aluno.component.html',
  styleUrls: ['./cadastrar-familiar-aluno.component.css']
})
export class CadastrarFamiliarAlunoComponent implements OnInit {

  pessoaFisica: PessoaFisica = new PessoaFisica();
  isAtualizar = false;

  familiar: Familiares = new Familiares();
  familiares: Familiares[];


  constructor(private alunoService: AlunoService,
              private toastService: ToastService,
              private route: ActivatedRoute,
              private location: Location,
              private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
              private fileUtils: FileUtils,
              private familiarAlunoService: FamiliarAlunoService
              ) {
    this.pessoaFisica.grausInstrucao = new GrausInstrucao();
  }

  ngOnInit() {
    this.familiar.aluno = new Aluno();
    this.familiar.aluno.pessoaFisica = this.pessoaFisica;
    this.familiar.aluno.pessoaFisica.grausInstrucao = new GrausInstrucao();


    let idFamiliaAluno: number;
    idFamiliaAluno = this.route.snapshot.queryParams.id ? this.route.snapshot.queryParams.id : null;
    if (idFamiliaAluno) {
      this.isAtualizar = true;

      this.familiarAlunoService.getById(idFamiliaAluno).pipe(
        switchMap((familiar: Familiares) => {
          this.familiar = familiar;
          return this.arquivoPessoaFisicaService.get(familiar.aluno.pessoaFisica.id);
        })
      ).subscribe((foto: any) => {
        this.familiar.aluno.pessoaFisica.foto = foto;
        foto = this.fileUtils.convertBufferArrayToBase64(foto);
        this.familiar.aluno.pessoaFisica.urlFoto = foto.changingThisBreaksApplicationSecurity;
      });
    }
  }


  cadastrar() {
    this.tratarDados();

    this.familiarAlunoService.cadastrar(this.familiar).pipe(
      switchMap((familiarRetorno: Familiares) => {
        if (this.familiar.aluno.pessoaFisica.isFotoChanged && this.familiar.aluno.pessoaFisica.foto) {
          return this.arquivoPessoaFisicaService.gravar(this.familiar.aluno.pessoaFisica.foto, familiarRetorno.aluno.pessoaFisica.id);
        } else {
          return new Observable(obs => obs.next());
        }
      })
    ).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Familiar cadastrado com sucesso');
    });
  }


  atualizar() {
    this.tratarDados();

    this.familiarAlunoService.alterar(this.familiar).pipe(
      switchMap((familiarRetorno: Familiares) => {
        if (this.familiar.aluno.pessoaFisica.isFotoChanged && this.familiar.aluno.pessoaFisica.foto) {
          return this.arquivoPessoaFisicaService.alterar(this.familiar.aluno.pessoaFisica.foto, familiarRetorno.aluno.pessoaFisica.id);
        } else {
         return new Observable(obs => obs.next());
        }
      })
    ).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Familiar atualizado com sucesso');
    });

  }

  tratarDados() {
    this.familiar.aluno.pessoaFisica.cep = this.familiar.aluno.pessoaFisica.cep ? this.retiraMascara(this.familiar.aluno.pessoaFisica.cep.toString()) : null
    this.familiar.aluno.pessoaFisica.celular = this.familiar.aluno.pessoaFisica.celular ? this.retiraMascara(this.familiar.aluno.pessoaFisica.celular.toString()) : null
    this.familiar.aluno.pessoaFisica.cpf = this.familiar.aluno.pessoaFisica.cpf ? this.retiraMascara(this.familiar.aluno.pessoaFisica.cpf.toString()) : null
    this.familiar.aluno.pessoaFisica.telefoneResidencial = this.familiar.aluno.pessoaFisica.telefoneResidencial ? this.retiraMascara(this.familiar.aluno.pessoaFisica.telefoneResidencial.toString()) : null
  }

  limpar() {
    this.familiar = new Familiares();
  }

  cancelar() {
    this.location.back();
  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }


}
