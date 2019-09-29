import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Questionario } from './questionario';

export class Talento {

    id: number;
    respostaTalento: string;
    dataRespostaTalento: Date;
    nrNotaCompetencia: number;
    observacao: string;
    pessoasFisica: PessoaFisica;
    questionario: Questionario;
    usuariosAlteracao: number;
}