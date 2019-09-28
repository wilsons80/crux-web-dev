import { AtividadeAluno } from './atividade-aluno';

export class FrequenciaAluno {
	id: number;
	justificativa: string;
	dataFrequencia: Date;
	atividadesAluno: AtividadeAluno;
	usuarioAlteracao: number;
}