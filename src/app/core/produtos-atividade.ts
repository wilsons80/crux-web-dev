import { FormaPagamento } from './forma-pagamento';
import { Produto } from 'src/app/core/produto';
import { Atividade } from 'src/app/core/atividade';
export class ProdutosAtividade{
    id:number;
	descricao:string;
	observacao:string;
	dataAquisicao:Date;
	valorProduto:number;
	dataVendaProduto:Date;
	descricaoOrigemProduto:string;
	qtdProduto:number;
	qtdProdutoVendida:number;
	formaPagamento:FormaPagamento;
	atividade:Atividade;
	produto:Produto;
	usuarioAlteracao:number;
}