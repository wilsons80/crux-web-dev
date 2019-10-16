import { Aluno } from './aluno';
import { Familiares } from './familiares';

export class ResponsaveisAluno {
	id: number;
	descDesligamento: string;
	descGrauParentesco: string;
	dataDesvinculacao: Date;
	dataVinculacao: Date;
	mesmoEnderResponsavel: string;
    tipoResponsavel: string;
    usuarioAlteracao: number;
}