import { Aluno } from './aluno';
import { PessoaFisica } from './pessoa-fisica';

export class Familiares {
    id: number;
	  descGrauParentesco: string;
	  descOutrasInformacoes: string;
	  descDesligamento: string;
    situacaoParentesco: string;

    pessoasFisica: PessoaFisica;
    aluno: Aluno;

	  dataCadastro: Date;
    dataDesligamento: Date;
    usuariosSistema: number;
}
