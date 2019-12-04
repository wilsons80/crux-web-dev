import { TipoEmpresa } from 'src/app/core/tipo-empresa';
export class ParceriasProjeto {

    id: number;
    descricaoTipoParceria: string
    dataInicio: Date;
    dataFim: Date;
    idProjeto: number;
    idEmpresa: number;
    tipoEmpresa: TipoEmpresa;
    valorParceria: number;

}