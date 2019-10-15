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
import { CondicoesMoradia } from 'src/app/core/condicoes-moradia';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-cadastrar-familiar-aluno',
  templateUrl: './cadastrar-familiar-aluno.component.html',
  styleUrls: ['./cadastrar-familiar-aluno.component.css']
})
export class CadastrarFamiliarAlunoComponent implements OnInit {

  isAtualizar = false;

  familiar: Familiares = new Familiares();
  familiares: Familiares[];

  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  constructor(private alunoService: AlunoService,
              private toastService: ToastService,
              private route: ActivatedRoute,
              private location: Location,
              private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
              private fileUtils: FileUtils,
              private familiarAlunoService: FamiliarAlunoService
              ) {
  }

  ngOnInit() {
    this.familiar.pessoasFisica = new PessoaFisica();
    this.familiar.pessoasFisica.grausInstrucao = new GrausInstrucao();
    this.familiar.pessoasFisica.condicoesMoradia = new CondicoesMoradia();

    this.perfilAcesso = this.route.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    // No caso de estar alterando um familiar
    const idFamiliaAluno = this.route.snapshot.queryParams.id ? this.route.snapshot.queryParams.id : null;
    if (idFamiliaAluno) {
      this.isAtualizar = true;

      this.familiarAlunoService.getById(idFamiliaAluno).pipe(
        switchMap((familiar: Familiares) => {
          this.familiar = familiar;
          return this.arquivoPessoaFisicaService.get(familiar.pessoasFisica.id);
        })
      ).subscribe((foto: any) => {
        this.familiar.pessoasFisica.foto = foto;
        foto = this.fileUtils.convertBufferArrayToBase64(foto);
        this.familiar.pessoasFisica.urlFoto = foto.changingThisBreaksApplicationSecurity;
      });

    } else {

      // No caso de estar cadastrando um novo familiar, então o aluno é passa como parâmetro.
      const idAluno = this.route.snapshot.queryParams.idAluno ? this.route.snapshot.queryParams.idAluno : null;
      if (idAluno) {
        this.alunoService.getById(idAluno).subscribe((aluno: Aluno) => {
          this.familiar.aluno = aluno;
        });
      }

    }
  }


  cadastrar() {
    this.tratarDados();

    this.familiarAlunoService.cadastrar(this.familiar).pipe(
      switchMap((familiarRetorno: Familiares) => {
        if (this.familiar.pessoasFisica.isFotoChanged && this.familiar.pessoasFisica.foto) {
          return this.arquivoPessoaFisicaService.gravar(this.familiar.pessoasFisica.foto, familiarRetorno.pessoasFisica.id);
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
        if (this.familiar.pessoasFisica.isFotoChanged && this.familiar.pessoasFisica.foto) {
          return this.arquivoPessoaFisicaService.alterar(this.familiar.pessoasFisica.foto, familiarRetorno.pessoasFisica.id);
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
    this.familiar.pessoasFisica.cep = this.familiar.pessoasFisica.cep ? this.retiraMascara(this.familiar.pessoasFisica.cep.toString()) : null
    this.familiar.pessoasFisica.celular = this.familiar.pessoasFisica.celular ? this.retiraMascara(this.familiar.pessoasFisica.celular.toString()) : null
    this.familiar.pessoasFisica.cpf = this.familiar.pessoasFisica.cpf ? this.retiraMascara(this.familiar.pessoasFisica.cpf.toString()) : null
    this.familiar.pessoasFisica.telefoneResidencial = this.familiar.pessoasFisica.telefoneResidencial ? this.retiraMascara(this.familiar.pessoasFisica.telefoneResidencial.toString()) : null
  }


  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
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



}