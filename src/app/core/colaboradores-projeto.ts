import { Funcionario } from './funcionario';

import { Projeto } from './projeto';

import { Cargo } from './cargo';

export class ColaboradoresProjeto{
    id:number;
	dataInicio:Date;
	dataFim:Date;
	funcionario:Funcionario;
	projeto:Projeto;
	cargo:Cargo;
	usuarioAlteracao:number;
}