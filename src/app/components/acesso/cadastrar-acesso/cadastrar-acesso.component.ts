import { Router } from '@angular/router';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Component, OnInit } from '@angular/core';
import { CadastroAcessoTO } from 'src/app/core/cadastroAcessoTO';

@Component({
  selector: 'app-cadastrar-acesso',
  templateUrl: './cadastrar-acesso.component.html',
  styleUrls: ['./cadastrar-acesso.component.css']
})
export class CadastrarAcessoComponent implements OnInit {


  usuarios: any[] = [
    { id: 1, nome: 'Wilson son son' },
    { id: 2, nome: 'Josué o cidadão de bem' },
  ]

  modulos: any[] = [
    { id: 1, nome: 'Modulozao muito doido' },
    { id: 2, nome: 'Modulo Lula ta preso babaca' },
  ]

  cadastroAcessoTO: CadastroAcessoTO = new CadastroAcessoTO();

  constructor(
    protected toolbarPrincipalService: ToolbarPrincipalService,
    private router:Router
    ) { }

  ngOnInit() { }

  cadastrar() {
    this.cadastroAcessoTO.idUsuario = null;
    this.cadastroAcessoTO.idModulo = null;
    this.cadastroAcessoTO.cadastrar = false;
    this.cadastroAcessoTO.alterar = false;
    this.cadastroAcessoTO.consultar = false;
    this.cadastroAcessoTO.deletar = false;
  }

  limpar() {
    this.cadastroAcessoTO = {
      idUsuario: null,
      idModulo: null,
      cadastrar: false,
      alterar: false,
      consultar: false,
      deletar: false,
    }
  }

  cancelar(){
    this.router.navigate(['home', this.toolbarPrincipalService.unidadeSelecionada.id ]);
  }

}
