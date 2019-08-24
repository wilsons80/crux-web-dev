import { ToastService } from 'src/app/services/toast/toast.service';
import { ModuloService } from './../../../services/modulo/modulo.service';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { AcessoService } from './../../../services/acesso/acesso.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Component, OnInit, Inject } from '@angular/core';
import { CadastroAcessoTO } from 'src/app/core/cadastroAcessoTO';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-cadastrar-acesso',
  templateUrl: './cadastrar-acesso.component.html',
  styleUrls: ['./cadastrar-acesso.component.css']
})
export class CadastrarAcessoComponent implements OnInit {


  usuarios: any;
  modulos: any;
  perfis: any;
  usuario: any;
  isAtualizar: boolean;

  selecaoModulo: boolean = false;

  labelBotao: string;

  cadastroAcessoTO: CadastroAcessoTO = new CadastroAcessoTO();

  constructor(
    protected toolbarPrincipalService: ToolbarPrincipalService,
    private acessoService:AcessoService,
    private activatedRoute: ActivatedRoute,
    private moduloService:ModuloService,
    private toastService:ToastService,
    private dialogRef: MatDialogRef<CadastrarAcessoComponent>,
    @Inject(MAT_DIALOG_DATA) data
    ) {
      this.cadastroAcessoTO.idUnidade = data.idUnidade;
      this.modulos = data.modulos;
      this.usuarios = data.usuarios;
      this.labelBotao = data.labelBotao;
      
      if(data.atualizar){
        this.isAtualizar = data.atualizar;
        this.cadastroAcessoTO.idModulo = data.usuario.idModulo;
        this.cadastroAcessoTO.idUsuario = data.usuario.idUsuario;
      }
    }

  ngOnInit() {
    if(this.isAtualizar){
      this.buscarPerfis();
    }
    
  }


  cadastrarAtualizar() {
    if(this.isAtualizar){
      this.atualizar();
    } 
    else {this.cadastrar();}
  }
  
  atualizar() {
    this.acessoService.alterar(this.cadastroAcessoTO).subscribe(() => {
      this.toastService.showSucesso("Usuário atualizado com sucesso");
      this.dialogRef.close();
    });
  }

  cadastrar() {
    this.acessoService.cadastrarAcesso(this.cadastroAcessoTO).subscribe(() => {
      this.toastService.showSucesso("Usuário Cadastrado com sucesso");
      this.dialogRef.close();
    });
  }

  limpar() {
    if(this.isAtualizar){
      this.cadastroAcessoTO.idGrupoModulo = null
    }else {

      this.cadastroAcessoTO = {
        idUnidade: this.activatedRoute.snapshot.params.idUnidade,
        idUsuario: null,
        idModulo: null,
        idGrupoModulo: null
      }
    }
    this.selecaoModulo = false;
  }

  cancelar(){
    this.dialogRef.close();
    
  }
  
  buscarPerfis(){
    this.moduloService.getGrupoModulo(this.cadastroAcessoTO.idUnidade, this.cadastroAcessoTO.idModulo)
                      .subscribe(perfis =>  this.perfis = perfis);
  }

}
