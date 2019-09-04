import { AcessoUnidade } from './acesso-unidade';
export class UsuarioLogado{
    token:string;
	username:string;
    unidadeLogada:AcessoUnidade;
    unidades:AcessoUnidade[]
}