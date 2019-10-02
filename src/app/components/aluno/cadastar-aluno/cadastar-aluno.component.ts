import { Component, OnInit } from '@angular/core';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Aluno } from 'src/app/core/aluno';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { ArquivoPessoaFisicaService } from 'src/app/services/arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';
import { FileUtils } from 'src/app/utils/file-utils';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastar-aluno',
  templateUrl: './cadastar-aluno.component.html',
  styleUrls: ['./cadastar-aluno.component.css']
})
export class CadastarAlunoComponent implements OnInit {

  pessoaFisica: PessoaFisica = new PessoaFisica();
  aluno: Aluno = new Aluno();

  isAtualizar = false;

  constructor(
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
    private fileUtils: FileUtils,
  ) {

  }

  ngOnInit() {
    this.aluno.pessoaFisica = this.pessoaFisica;

    let idAluno: number;
    idAluno = this.route.snapshot.queryParams.id ? this.route.snapshot.queryParams.id : null;
    if (idAluno) {
      this.isAtualizar = true;
      this.alunoService.getById(idAluno).pipe(
        switchMap((aluno: Aluno) => {
          this.aluno = aluno;
          return this.arquivoPessoaFisicaService.get(aluno.pessoaFisica.id);
        })
      ).subscribe((foto: any) => {
        foto = this.fileUtils.convertBufferArrayToBase64(foto);

        this.aluno.pessoaFisica.foto = foto;
        this.aluno.pessoaFisica.urlFoto = foto.changingThisBreaksApplicationSecurity;
      });
    }
  }

  cadastrar() {
    this.tratarDados();

    this.alunoService.cadastrar(this.aluno).pipe(
      switchMap((alunoRetorno: Aluno) => {
        if (this.aluno.pessoaFisica.foto){
          return this.arquivoPessoaFisicaService.gravar(this.aluno.pessoaFisica.foto, alunoRetorno.pessoaFisica.id);
        } else {
          return new Observable(obs => obs.next());
        }
      })
    ).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Aluno cadastrado com sucesso');
    });
  }

  tratarDados() {
    this.aluno.pessoaFisica.cep = this.aluno.pessoaFisica.cep ? this.retiraMascara(this.aluno.pessoaFisica.cep.toString()) : null
    this.aluno.pessoaFisica.celular = this.aluno.pessoaFisica.celular ? this.retiraMascara(this.aluno.pessoaFisica.celular.toString()) : null
    this.aluno.pessoaFisica.cpf = this.aluno.pessoaFisica.cpf ? this.retiraMascara(this.aluno.pessoaFisica.cpf.toString()) : null
    this.aluno.pessoaFisica.telefoneResidencial = this.aluno.pessoaFisica.telefoneResidencial ? this.retiraMascara(this.aluno.pessoaFisica.telefoneResidencial.toString()) : null
  }

  limpar() {
    this.aluno = new Aluno();
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


  atualizar() {
    this.tratarDados();

    this.alunoService.alterar(this.aluno).pipe(
      switchMap((aluno: Aluno) => {
        if(this.aluno.pessoaFisica.foto){
          return this.arquivoPessoaFisicaService.alterar(this.aluno.pessoaFisica.foto, aluno.pessoaFisica.id)
        } else {
         return new Observable(obs => obs.next());
        }
      })
    ).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Aluno atualizado com sucesso');
    });

  }

}
