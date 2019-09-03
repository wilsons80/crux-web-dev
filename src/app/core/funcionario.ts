import { ConclusaoParecer } from './conclusao-parecer';
import { ParecerEntrevistador } from './parecer-entrevistador';
import { Unidade } from './unidade';
import { TipoFuncionario } from './tipo-funcionario';
import { Cargo } from './cargo';
import { PessoaFisica } from './pessoa-fisica';
import { Empresa } from './empresa';

export class Funcionario{
    id:number;
	matricula:string;
	dataAdmissao:Date;
	dataDemissao:Date;
	tipoFuncionario:TipoFuncionario;
	salarioPretendido:number;
	cargo:Cargo;
    pessoasFisica:PessoaFisica;
    unidade:Unidade;
	dtHrEntrevista:Date;
    parecerEntrevistador:ParecerEntrevistador;
	descricaoParecerEntrevistador:string;
	conclusaoParecer:ConclusaoParecer;
	funcionarioEntrevistador:Funcionario;
	empresaFuncionario:Empresa; 
}