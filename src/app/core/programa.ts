import { Objetivo } from './objetivo';
import { Unidade } from './unidade';

export class Programa {
	id: number;
	nome: string;
	descricao: string;
	dataInicio: Date;
	dataFim: Date;
	idCoordenador: number;
	faixaEtariaFim: number;
	faixaEtariaInicio: number;
	objetivo: Objetivo;
	usuarioAlteracao: number;

	unidades:Unidade[];
}