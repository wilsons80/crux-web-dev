import { NiveisTurmas } from 'src/app/core/niveis-turmas';
import { Unidade } from 'src/app/core/unidade';
import { Projeto } from 'src/app/core/projeto';
import { Programa } from 'src/app/core/programa';

export class Turmas {

	id: number;
	descricao: string;
	dataPrevisaoInicio: Date;
	dataPrevisaoTermino: Date;
	dataInicioTurma: Date;
	dataFimTurma: Date;

	horaInicio: number;
	horaFim: number;

	numeroMaximoParticipantes: number;
	numeroCargaHoraria: number;

	observacao: string;

	programa: Programa;
	projeto: Projeto;
	unidade: Unidade;

	//M = MATUTINO, V = VESPERTINO, N = NOTURNO, O = OUTRO
	turno: string;
	niveisTurma: NiveisTurmas;
	usuarioAlteracao: number;

}
