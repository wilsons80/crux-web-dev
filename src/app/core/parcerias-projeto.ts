import { TipoEmpresa } from 'src/app/core/tipo-empresa';
import { Empresa } from './empresa';
import { Projeto } from './projeto';
export class ParceriasProjeto {

    id: number;
    descricaoTipoParceria: string
    dataInicio: Date;
    dataFim: Date;
    projeto: Projeto;
    empresa: Empresa;
    tipoEmpresa: TipoEmpresa;
    valorParceria: number;

}