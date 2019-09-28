import { Aluno } from './aluno';
import { TipoResponsaveis } from './tipo-responsaveis';
import { Familiares } from './familiares';

export class ResponsaveisAluno {
	id: number;
	descDesligamento: string;
	descGrauParentesco: string;
	dataDesvinculacao: Date;
	dataVinculacao: Date;
	mesmoEnderResponsavel: string;
    
    tipoResponsavel: TipoResponsaveis;
	aluno: Aluno;
	familiar: Familiares;
    
    usuarioAlteracao: number;
}