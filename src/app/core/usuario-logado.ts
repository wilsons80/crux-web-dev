import { AcessoUnidade } from './acesso-unidade';
export class UsuarioLogado{
    token:string;
    username:string;
    nomeUsuario: string;
    unidadeLogada:AcessoUnidade;
    unidades:AcessoUnidade[]
}
