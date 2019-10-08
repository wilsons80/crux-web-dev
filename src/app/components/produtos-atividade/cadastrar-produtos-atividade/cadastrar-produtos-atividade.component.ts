import { FormaPagamento } from './../../../core/forma-pagamento';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/core/atividade';
import { Produto } from 'src/app/core/produto';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { ProdutosAtividadeService } from 'src/app/services/produtos-atividade/produtos-atividade.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ProdutosAtividade } from './../../../core/produtos-atividade';

@Component({
  selector: 'app-cadastrar-produtos-atividade',
  templateUrl: './cadastrar-produtos-atividade.component.html',
  styleUrls: ['./cadastrar-produtos-atividade.component.css']
})
export class CadastrarProdutosAtividadeComponent implements OnInit {


  produtosAtividade: ProdutosAtividade = new ProdutosAtividade()
  produtos: Produto[];
  atividades: Atividade[];

  formasPagamento: any = [
    {id:1, sigla:FormaPagamento.DINHEIRO, descricao: 'DINHEIRO'},
    {id:2, sigla:FormaPagamento.CARTAO, descricao: 'CARTÃO'},
    {id:3, sigla:FormaPagamento.DEBITO, descricao: 'DÉBITO'},
    {id:4, sigla:FormaPagamento.DESCONTO_FOLHA, descricao: 'DESCONTO EM FOLHA'},
  ]

// DINHEIRO(1, "R", "Dinheiro"), CARTAO(2, "C", "Cartão"), DEBITO(3, "D", "Débito"),
// 	DESCONTO_FOLHA(4, "F", "Desconto em Folha");

  isAtualizar: boolean = false;

  constructor(
    private produtosAtividadeService: ProdutosAtividadeService,
    private produtoService: ProdutoService,
    private atividadeService: AtividadeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {

    this.produtosAtividade.produto = new Produto();
    this.produtosAtividade.atividade = new Atividade();
    this.produtosAtividade.observacao = '';

    this.produtoService.getAll().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    })

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    })

    let idProdutoAtividade: number;
    idProdutoAtividade = this.route.snapshot.queryParams.idProdutoAtividade ? this.route.snapshot.queryParams.idProdutoAtividade : null;
    if (idProdutoAtividade) {
      this.isAtualizar = true;
      this.produtosAtividadeService.getById(idProdutoAtividade).subscribe((produtosAtividade: ProdutosAtividade) => {
        this.produtosAtividade = produtosAtividade
      });
    }

  }
  cadastrar() {
    this.produtosAtividadeService.cadastrar(this.produtosAtividade).subscribe(() => {
      this.router.navigate(['produtosatividade']);
      this.toastService.showSucesso("Produto Atividade cadastrado com sucesso");
    });
  }

  limpar() {
    this.produtosAtividade = new ProdutosAtividade();
  }

  cancelar() {
    this.router.navigate(['produtosatividade']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.produtosAtividadeService.alterar(this.produtosAtividade).subscribe(() => {
      this.router.navigate(['produtosatividade']);
      this.toastService.showSucesso("Produto Atividade atualizado com sucesso");
    });

  }

}
