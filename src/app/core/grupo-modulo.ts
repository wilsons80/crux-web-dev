import { Unidade } from './unidade';
import { Modulo } from './modulo';
import { PerfilAcesso } from './perfil-acesso';

export class GrupoModulo {
	
	idGrupo: number;
	nome: string;
	descricao: string;
	modulo: Modulo;
	perfilAcesso: PerfilAcesso;
	unidade: Unidade;
}