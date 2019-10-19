import { PessoaFisica } from './pessoa-fisica';

export class UsuarioSistema {
  idUsuario: number;
	nomeUsuario: string;
	senhaUsuario: string;
	descFimVigenciaUsuario: string;
	dataFimVigencia: Date;
	dataInicioVigencia: Date;
	dataUltimoAcesso: Date;
	qtdAcessoNegado: number;
	stAtivo: string;
	stTrocaSenha: string;
	pessoaFisica: PessoaFisica;
	usuarioAlteracao: number;
	idUnidade: number;
}
