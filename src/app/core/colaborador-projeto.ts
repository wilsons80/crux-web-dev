import { Cargo } from './cargo';
import { Funcionario } from './funcionario';
import { Projeto } from './projeto';

export class ColaboradorProjeto{


    id:number;
    dataEntrada:Date;
    dataSaida:Date;
    cargo:Cargo;
    funcionario:Funcionario;
    projeto:Projeto;
    
    //TODO ajusta depois de fazer o tipo Contratacao
    tipoContratacao:any;
  
}