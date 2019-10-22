import { Avaliacao } from './avaliacao';
import { AtividadeAluno } from './atividade-aluno';
import { NotaAvaliacao } from './nota-avaliacao';

export class AvaliacaoAluno {
    id: number;
	descriaoAvaliacao: string;
	dataAvaliacao: Date;
	
	atividadesAluno: AtividadeAluno;
	avaliacao: Avaliacao;
	notaAvaliacao: NotaAvaliacao;

    usuarioAlteracao: number;
}