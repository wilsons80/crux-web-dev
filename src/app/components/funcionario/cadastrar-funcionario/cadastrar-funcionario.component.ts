import { ArquivoPessoaFisicaService } from './../../../services/arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Funcionario } from './../../../core/funcionario';
import { PessoaFisica } from './../../../core/pessoa-fisica';
import { FuncionarioService } from './../../../services/funcionario/funcionario.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FileUtils } from 'src/app/utils/file-utils';
import { GrausInstrucao } from 'src/app/core/graus-instrucao';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.css']
})
export class CadastrarFuncionarioComponent implements OnInit {

  grauInstrucao: GrausInstrucao = new GrausInstrucao();
  funcionarioEntrevistador: Funcionario = new Funcionario();
  pessoaFisica: PessoaFisica = new PessoaFisica();
  funcionario: Funcionario = new Funcionario();

  isAtualizar: boolean = false;

  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private funcionarioService: FuncionarioService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
    private fileUtils: FileUtils,
  ) {

  }

  ngOnInit() {

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(this.perfilAcesso.insere === 'N'){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(this.perfilAcesso.altera === 'N'){
      this.mostrarBotaoAtualizar = false;
    }
    this.pessoaFisica.grausInstrucao = this.grauInstrucao;
    this.funcionario.pessoasFisica = this.pessoaFisica;
    this.funcionario.funcionarioEntrevistador = this.funcionarioEntrevistador;

    let idFuncionario: number;
    idFuncionario = this.activatedRoute.snapshot.queryParams.idFuncionario ? this.activatedRoute.snapshot.queryParams.idFuncionario : null;
    if (idFuncionario) {
      this.isAtualizar = true;
      this.funcionarioService.getById(idFuncionario).pipe(
        switchMap((funcionario: Funcionario) => {
          this.funcionario = funcionario;

          if (this.funcionario.dtHrEntrevista) {
            this.formataHorario(this.funcionario.dtHrEntrevista);
          }

          return this.arquivoPessoaFisicaService.get(funcionario.pessoasFisica.id)
        })
      ).subscribe((foto: any) => {
        this.funcionario.pessoasFisica.foto = foto;
        foto = this.fileUtils.convertBufferArrayToBase64(foto);
        this.funcionario.pessoasFisica.urlFoto = foto.changingThisBreaksApplicationSecurity;
      });
    }
  }


  cadastrar() {
    this.tratarDados();
    this.funcionarioService.cadastrar(this.funcionario).pipe(
      switchMap((funcionarioRetorno: Funcionario) => {
        if (this.funcionario.pessoasFisica.isFotoChanged && this.funcionario.pessoasFisica.foto) {
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
    this.funcionario.dtHrEntrevista = this.getDataHora(this.funcionario.dtHrEntrevista, this.funcionario.horaEntrevista)

    this.funcionario.pessoasFisica.cep = this.funcionario.pessoasFisica.cep ? this.retiraMascara(this.funcionario.pessoasFisica.cep.toString()) : null
    this.funcionario.pessoasFisica.celular = this.funcionario.pessoasFisica.celular ? this.retiraMascara(this.funcionario.pessoasFisica.celular.toString()) : null
    this.funcionario.pessoasFisica.cpf = this.funcionario.pessoasFisica.cpf ? this.retiraMascara(this.funcionario.pessoasFisica.cpf.toString()) : null
    this.funcionario.pessoasFisica.telefoneResidencial = this.funcionario.pessoasFisica.telefoneResidencial ? this.retiraMascara(this.funcionario.pessoasFisica.telefoneResidencial.toString()) : null


  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  limpar() {
    this.funcionario = new Funcionario()
  }

  cancelar() {
    this.location.back();
  }

  atualizar() {

    this.tratarDados();
    this.funcionarioService.alterar(this.funcionario).pipe(

      switchMap((funcionario: Funcionario) => {
        if (this.funcionario.pessoasFisica.isFotoChanged && this.funcionario.pessoasFisica.foto) {
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

  getDataHora(data: Date, hora: string) {
    if (data && hora) {
      data = new Date(data);
      let hh = Number.parseInt(hora.substr(0, 2));
      let mm = Number.parseInt(hora.substr(3, 5));

      data.setHours(hh, mm);
    }
    return data;
  }

  formataHorario(dataEntrevista: Date) {
      let data = new Date(dataEntrevista);
    let hora = data.getHours().toString().length == 1 ? "0" + data.getHours().toString() : data.getHours().toString();
    let min = data.getMinutes().toString().length == 1 ? "0" + data.getMinutes().toString() : data.getMinutes().toString();

    this.funcionario.horaEntrevista = hora + ":" + min;

  }

}
