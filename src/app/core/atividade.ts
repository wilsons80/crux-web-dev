import { PlanosAcao } from './planos-acao';
import { Projeto } from './projeto';
import { Unidade } from './unidade';
export class Atividade{
    id:number;
    descricao:string;
    descricaoLocalExecucao:string;
    dataFim:Date;
    dataInicio:Date;
    dataPrevisaoInicio:Date;
    dataPrevisaoTermino:Date;
	horaFim:number;
	horaInicio:number;
	numeroAulas:number;
	cargaHoraria:number;
    maximoParticipantes:number;
    periodoAtividade:number;
    domingo:string;
    horarioFixo:string;
    localExecucao:string;
    quarta:string;
    quinta:string;
    sabado:string;
    segunda:string;
    sexta:string;
    terca:string;
    observacoes:string;
    valorCustoAtividade:number;
	
    planosAcao:PlanosAcao;
    projeto:Projeto;
    unidade:Unidade;
	
    usuarioAlteracao:number;
}