import { Cargo } from './cargo';
import { Projeto } from './projeto';

export class ComposicaoRhProjeto{

    id:number;
    projeto:Projeto;
    cargo:Cargo;

    //TODO Ajustar quando tiver tipo contratacao
    tipoContratacao:any;

    quantidade:number;
    


//     id_composicao_projeto 
// id_projeto            
// id_cargo              
// id_tipo_contratacao   
// qtd                   
// id_usuario_apl        
}