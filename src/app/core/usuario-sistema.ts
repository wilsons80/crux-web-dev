import { PessoaFisica } from './pessoa-fisica';

export class UsuarioSistema {
  idUsuario: number;
	username: string;
	senha: string;
	descFimVigenciaUsuario: string;
	dataFimVigencia: Date;
	dataInicioVigencia: Date;
	dataUltimoAcesso: Date;
	qtdAcessoNegado: number;
	stAtivo: string;
	stTrocaSenha: string;
	pessoaFisica: PessoaFisica;
	usuarioAlteracao: number;
}
