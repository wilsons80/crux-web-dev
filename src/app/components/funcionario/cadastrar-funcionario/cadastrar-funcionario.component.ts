import { ToastService } from 'src/app/services/toast/toast.service';
import { Location } from '@angular/common';
import { FuncionarioService } from './../../../services/funcionario/funcionario.service';
import { CondicoesMoradiaService } from './../../../services/condicoes-moradia/condicoes-moradia.service';
import { GrausInstrucao } from './../../../core/graus-instrucao';
import { CondicoesMoradia } from './../../../core/condicoes-moradia';
import { PessoaFisica } from './../../../core/pessoa-fisica';
import { Funcionario } from './../../../core/funcionario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.css']
})
export class CadastrarFuncionarioComponent implements OnInit {

  pessoaFisica:PessoaFisica = new PessoaFisica();
  funcionario:Funcionario = new Funcionario();
  

  constructor(
    private funcionarioService:FuncionarioService,
    private location:Location,
    private toastService:ToastService
    ) { 

  }

  cadastrar(){
    this.funcionarioService.cadastrar(this.funcionario).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Departamento cadastrado com sucesso");
    })
  }

  ngOnInit() {
    this.funcionario.pessoasFisica = this.pessoaFisica;
  }

}
