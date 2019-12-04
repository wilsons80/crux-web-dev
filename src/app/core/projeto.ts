import { Iniciativa } from './iniciativa';
import { Programa } from './programa';
import { Unidade } from './unidade';
import { ColaboradoresProjeto } from './colaboradores-projeto';
import { ParceriasProjeto } from './parcerias-projeto';

export class Projeto {

	id: number;
	nome: string;
	descricao: string;
	dataFim: Date;
	dataInicio: Date;
	dataPrevisaoInicio: Date;
	dataPrevisaoTermino: Date;
	iniciativa: Iniciativa;
	programa: Programa;
	usuarioAlteracao: number;
	unidades: Unidade[];
	colaboradoresProjeto:ColaboradoresProjeto[];
	parceriasProjeto:ParceriasProjeto[];
	// ComposicaoRhProjeto

}

