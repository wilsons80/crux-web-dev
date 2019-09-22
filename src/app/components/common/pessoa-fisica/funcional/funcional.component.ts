import { ConclusaoParecer } from './../../../../core/conclusao-parecer';
import { TipoFuncionario } from './../../../../core/tipo-funcionario';
import { Funcionario } from 'src/app/core/funcionario';
import { Component, OnInit, Input } from '@angular/core';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { ParecerEntrevistador } from 'src/app/core/parecer-entrevistador';

@Component({
  selector: 'funcional',
  templateUrl: './funcional.component.html',
  styleUrls: ['./funcional.component.css']
})
export class FuncionalComponent implements OnInit {

  @Input() funcionario:Funcionario

  horaEntrevista;

  tipoFuncionario = TipoFuncionario;

  tiposFuncionario = [
    {id: TipoFuncionario.CANDIDATO_VAGA_FUNCIONARIO, descricao:'CANDIDATO A VAGA DE FUNCIONÁRIO'},
    {id: TipoFuncionario.COLABORADOR, descricao:'COLABORADOR'},
    {id: TipoFuncionario.ESTAGIARIO, descricao:'ESTAGIÁRIO'},
    {id: TipoFuncionario.FUNCIONARIO, descricao:'FUNCIONÁRIO'},
    {id: TipoFuncionario.INSTRUTOR, descricao:'INSTRUTOR'},
    {id: TipoFuncionario.VOLUNTARIO, descricao:'VOLUNTÁRIO'},
  ]
  
  listaParecer = [
    {id: ParecerEntrevistador.TOTALMENTO_ADEQUADO_PERFIL, descricao:'TOTALMENTE ADEQUADO AO PERFIL'},
    {id: ParecerEntrevistador.ADEQUADO_PERFIL, descricao:'ADEQUADO AO PERFIL'},
    {id: ParecerEntrevistador.NAO_ADEQUADO_PERFIL, descricao:' NÃO ADEQUADO AO PERFIL'},
    {id: ParecerEntrevistador.INDICADO_CONSULTA_FUTURA, descricao:'INDICADO PARA CONSULTA FUTURA'}
  ]

  conclusaoDoParecer = [
    {id: ConclusaoParecer.CONTINUAR, descricao: 'DAR CONTINUIDADE AO PROCESSO SELETIVO'},
    {id: ConclusaoParecer.NAO_CONTINUAR, descricao: 'NÃO DAR CONTINUIDADE AO PROCESSO SELETIVO'},
  ]

  // (Tipo =  D = CANDIDATO A VAGA DE FUNCIONÁRIO): { S = Dar continuidade ao processo seletivo; n = Não dar continuidade ao processo seletivo}	12	13
  funcionarios: Funcionario[];

  
  constructor() { }

  ngOnInit() {
  }

}


// matricula:string;
// 	dataAdmissao:Date;
// 	dataDemissao:Date;
// 	tipoFuncionario:TipoFuncionario;
// 	salarioPretendido:number;
// 	cargo:Cargo;
//     pessoasFisica:PessoaFisica;
//     unidade:Unidade;
// 	dtHrEntrevista:Date;
//     parecerEntrevistador:ParecerEntrevistador;
// 	descricaoParecerEntrevistador:string;
// 	conclusaoParecer:ConclusaoParecer;
// 	funcionarioEntrevistador:Funcionario;
// 	empresaFuncionario:Empresa; 