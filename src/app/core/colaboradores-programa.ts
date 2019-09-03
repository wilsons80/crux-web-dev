import { Funcionario } from './funcionario';
import { Programa } from './programa';
import { Cargo } from './cargo';

export class ColaboradoresPrograma{
    id:number;
	dataInicio:Date;
	dataFim:Date;
	funcionario:Funcionario;
	programa:Programa;
	cargo:Cargo;
	usuarioAlteracao:number;
}