import { Iniciativa } from './iniciativa';
import { Objetivo } from './objetivo';

export class Programa{
    id:number;
	nome:string;
	descricao:string;
	dataInicio:Date;
	dataFim:Date;
	idCoordenador:number;
	faixaEtariaFim:number;
	faixaEtariaInicio:number;
	objetivo:Objetivo;
	iniciativa:Iniciativa;
	usuarioAlteracao:number;
}