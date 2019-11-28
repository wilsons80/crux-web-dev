import { Instituicao } from './instituicao';

export class Unidade {

    idUnidade: number
	siglaUnidade: string
	nomeUnidade: string
	endereco: string
	telefone: string
	descricaoSituacaoImovel: string
	descricaoEstruturaFisicaImovel: string
	arquivo: number
	usuarioAlteracao: number
	visao: string
	missao: string
	email: string
	cep: number
	bairro: string
	uf: string
	cidade:string
	celular: string
	tipoUnidade: string
	classificacaoSituacaoImovel: string
	nomeFantasia: string
	cnpj:string
	inscricaoEstadual:string
	inscricaoMunicipal:string
	homePage:string
	foto?:any;
    urlFoto?:any;
    isFotoChanged?:boolean;
	instituicao: Instituicao

	numeroCnas:string;
	numeroCdca:string;
	dataVigenciaCdca:Date;
	numeroCas:string;
	dataVigenciaCas:Date;
}
