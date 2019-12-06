import { Material } from './material';
import { Atividade } from './atividade';
export class MateriaisAtividade{
    
    id:number;
	descricao:string;
	observacao:string;
	dataAquisicao:Date;
	valorMaterial:number;
	dataVendaMaterial:Date;
	descricaoOrigemMaterial:string;
	qtdMaterial:number;
	qtdMaterialVendida:number;
	formaPagamento:string;
    atividade:Atividade;
	material:Material;
    usuarioAlteracao:number;
    
}