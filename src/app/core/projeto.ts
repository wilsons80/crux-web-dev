import { Programa } from './programa';
import { Iniciativa } from './iniciativa';

export class Projeto {

    id:number;
	nome:string;
	descricao:string;
	dataFim:Date;
	dataInicio:Date;
	dataPrevisaoInicio:Date;
	dataPrevisaoTermino:Date;
	iniciativa:Iniciativa;
	programa:Programa;
	usuarioAlteracao:number;
	
}