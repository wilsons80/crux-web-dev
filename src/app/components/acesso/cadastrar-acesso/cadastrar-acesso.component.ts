import { ToastService } from 'src/app/services/toast/toast.service';
import { ModuloService } from './../../../services/modulo/modulo.service';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { AcessoService } from './../../../services/acesso/acesso.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Component, OnInit } from '@angular/core';
import { CadastroAcessoTO } from 'src/app/core/cadastroAcessoTO';

@Component({
  selector: 'app-cadastrar-acesso',
  templateUrl: './cadastrar-acesso.component.html',
  styleUrls: ['./cadastrar-acesso.component.css']
})
export class CadastrarAcessoComponent implements OnInit {


  usuarios: any;

  modulos: any;

  cadastroAcessoTO: CadastroAcessoTO = new CadastroAcessoTO();

  constructor(
    protected toolbarPrincipalService: ToolbarPrincipalService,
    private router:Router,
    private acessoService:AcessoService,
    private usuarioService:UsuarioService,
    private activatedRoute: ActivatedRoute,
    private moduloService:ModuloService,
    private toastService:ToastService
    ) { }

  ngOnInit() { 
    this.cadastroAcessoTO.idUnidade = this.activatedRoute.snapshot.params.idUnidade,
    this.usuarioService.getUsuariosPorUnidade(this.cadastroAcessoTO.idUnidade).subscribe(usuarios => {
      console.log(usuarios)
      this.usuarios = usuarios;
    });

    this.moduloService.getModulosPorUnidade(this.cadastroAcessoTO.idUnidade).subscribe(modulos => {
      console.log(modulos)
      this.modulos = modulos;
    });

  }

  cadastrar() {

    this.acessoService.cadastrarAcesso(this.cadastroAcessoTO).subscribe(() => {
      this.toastService.showSucesso("Usuário Cadastrado com sucesso");
      this.router.navigate(['home', this.cadastroAcessoTO.idUnidade ]);
    });
  }

  limpar() {
    this.cadastroAcessoTO = {
      idUnidade: this.activatedRoute.snapshot.params.idUnidade,
      idUsuario: null,
      idModulo: null,
      insere: false,
      altera: false,
      consulta: false,
      deleta: false,
    }
  }

  cancelar(){
    this.router.navigate(['home', this.toolbarPrincipalService.unidadeSelecionada.id ]);
  }

}
