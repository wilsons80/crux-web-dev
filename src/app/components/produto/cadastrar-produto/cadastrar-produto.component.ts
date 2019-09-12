import { ProdutoService } from './../../../services/produto/produto.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/core/produto';
import { ActivatedRoute } from '@angular/router';
import { Perspectiva } from 'src/app/core/perspectiva';
import { Objetivo } from 'src/app/core/objetivo';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

  produto: Produto = new Produto();

  isAtualizar: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private location:Location,
    private produtoService:ProdutoService,
    private toastService:ToastService
  ) { }


  ngOnInit() {

    let idProduto: number;
    idProduto = this.route.snapshot.queryParams.idProduto ? this.route.snapshot.queryParams.idProduto : null;
    if (idProduto) {
      this.isAtualizar = true;
      this.produtoService.getById(idProduto).subscribe((produto: Produto) => {
        this.produto = produto;
      });
    }
    
  }
  cadastrar() {
    this.produtoService.cadastrar(this.produto).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Produto cadastrado com sucesso");
    });
  }

  limpar() { 
    this.produto = new Produto();
  }

  cancelar() { 
    this.location.back();
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar(){
    this.produtoService.alterar(this.produto).subscribe(()=>{
      this.location.back();
      this.toastService.showSucesso("Produto atualizado com sucesso");
    });
    
  }

}
