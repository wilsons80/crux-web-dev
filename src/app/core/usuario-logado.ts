import { AcessoUnidade } from './acesso-unidade';
export class UsuarioLogado {
    token: string;
    username: string;
    nomeUsuario: string;
    trocarSenha: boolean;
    admin: boolean;
    unidadeLogada: AcessoUnidade;
    unidades: AcessoUnidade[];
    idPessoaFisica: number;
}
