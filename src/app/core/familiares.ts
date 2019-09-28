import { Aluno } from './aluno';
import { PessoaFisica } from './pessoa-fisica';
import { SituacaoParentesco } from './situacao-parentesco';

export class Familiares {
    id: number;
	descGrauParentesco: string;
	descOutrasInformacoes: string;
	descDesligamento: string;

    situacaoParentesco: SituacaoParentesco;

    pessoasFisica: PessoaFisica;
    aluno: Aluno;

	dataCadastro: Date;
    dataDesligamento: Date;
    usuariosSistema: number;
}