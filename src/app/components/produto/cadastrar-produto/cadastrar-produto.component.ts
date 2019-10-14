import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/core/produto';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ProdutoService } from './../../../services/produto/produto.service';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

  produto: Produto = new Produto();

  isAtualizar: boolean = false;

  perfilAcesso: PerfilAcesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;



  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private produtoService: ProdutoService,
    private toastService: ToastService
  ) { }


  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }
    let idProduto: number;
    idProduto = this.activatedRoute.snapshot.queryParams.idProduto ? this.activatedRoute.snapshot.queryParams.idProduto : null;
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


  atualizar() {
    this.produtoService.alterar(this.produto).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Produto atualizado com sucesso");
    });

  }
  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}
