import { ComposicaoRhProjeto } from './composicao-rh-projeto';
import { ParceriaProjeto } from './parceria-projeto';
import { ColaboradorProjeto } from './colaborador-projeto';
import { ProjetoUnidade } from './projeto-unidade';
import { Programa } from './programa';
import { Iniciativa } from './iniciativa';
import { Unidade } from './unidade';

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
	unidades:Unidade[];
	// colaboradoresProjeto:ColaboradorProjeto[];
	// parceriasProjeto:ParceriaProjeto[];
	// ComposicaoRhProjeto
	
}

