import { Cbo } from './cbo';
import { TipoCargo } from './tipo-cargo';

export class Cargo {
	id: number;
	codigo: string;
	nome: string;
	tipoCargo: TipoCargo;
	usuarioAlteracao: number;
	cbo: Cbo;
    descricaoPerfilProfissional: string;
    descricaoResumoAtividades: string;
    qtdHoras: number;
}
