import { TipoEmpresa } from 'src/app/core/tipo-empresa';
import { Empresa } from './empresa';
import { Projeto } from './projeto';
export class ParceriaProjeto{

    id:number;
    projeto:Projeto;
    empresa:Empresa;
    tipoEmpresa:TipoEmpresa;
    dataInicioParceria:Date;
    dataFimParceria:Date;
    valorParceria:number;
  
}