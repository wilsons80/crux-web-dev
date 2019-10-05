import { CondicoesMoradia } from './condicoes-moradia';
import { GrausInstrucao } from './graus-instrucao';

export class PessoaFisica{

    id:number;
    nome:string;
    orgaoCi:string;
    classificadorMotivoNaoTrab:string;
    descricaoPessoaFisicaAtendidoOrgaoRede: string;
    bairro:string;
    cidadeNaturalidade:string;
    condicaoMoradia:string;
    cor:string;
    cursoEscola:string;
    email:string;
    endereco:string;
    escola:string;
    escolaridade:string;
    estadoCivil:string;
    formaIngressoEntidade:string;
    medicamentosControlados:string;
    motivoNaoTrab:string;
    nivelEscolaridade:string;
    outrosBenSoc:string;
    periodoEscola:string;
    pontoReferencia:string;
    problemaSaude:string;
    profissao:string;
    redeApSocRelev:string;
    redeApoioSocial:string;
    regiaoEscola:string;
    serieEscola:string;
    sexo:string;
    situacaoTrabalho:string;
    tipoEscola:string;
    turno:string;
    dataNascimento:Date;
    nomeEmpresaTrabalho:string;
    nomeMae:string;
    nomePai:string;
    cep:number;
    identidade:string;
    cpf:number;
    cts:string;
    celular:string;
    nis:string;
    serieCtps:string;
    sessaoTitulo:string;
    telefoneComercial:string;
    telefoneResidencial:string;
    tituloEleitor:string;
    zonaTitulo:string;
    ufCi:string;
    ufEndereco:string;
    ufNascimento:string;
   // Classificador indicativo se a pessoa física é atendida por outro órgão da
   // rede de apoio social / pessoal
   statusAtendidoOrgaoRede:string;
   autorizaEmail:string;
   beneficiarioBolsaFamilia:string;
   observacoes:string;
   valorAluguel:number;
   valorBolsaFamilia:number;
   valorOutrosBenerficiosSoc:number;
   valorRenda:number;
   idArquivo:number;
   condicoesMoradia:CondicoesMoradia;
   grausInstrucao:GrausInstrucao;
   usuarioAlteracao:number;
   foto?:any;
   urlFoto?:any;
   isFotoChanged?:boolean;
    
}