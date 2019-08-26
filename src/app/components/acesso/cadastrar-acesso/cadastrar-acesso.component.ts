import { UnidadeService } from 'src/app/services/unidade/unidade.service';
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
  unidades: boolean;
  usuario: any;
  isAtualizar: boolean;

  labelBotao: string;

  cadastroAcessoTO: CadastroAcessoTO = new CadastroAcessoTO();

  constructor(
    protected toolbarPrincipalService: ToolbarPrincipalService,
    private acessoService: AcessoService,
    private moduloService: ModuloService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<CadastrarAcessoComponent>,
    private unidadeService: UnidadeService,
    private usuarioService:UsuarioService,

    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.usuarios = data.usuarios,
    this.modulos= data.modulos,
    this.labelBotao = data.labelBotao;
    
    if (data.atualizar) {
      this.cadastroAcessoTO.idUnidade = data.usuario.idUnidade;
      this.isAtualizar = data.atualizar;
      this.cadastroAcessoTO.idModulo = data.usuario.idModulo;
      this.cadastroAcessoTO.idUsuario = data.usuario.idUsuario;
    }
  }

  ngOnInit() {
    this.unidadeService.getPorUsuario().subscribe((unidades: any) => this.unidades = unidades);
    if(this.isAtualizar){
      this.buscarPerfis();
    }
  }

  unidadeSelecionada(){
    if (!this.isAtualizar) {
      this.limparCamposDependendentesUnidade();
    }
      this.usuarioService.getUsuariosPorUnidade(this.cadastroAcessoTO.idUnidade).subscribe(usuarios => this.usuarios = usuarios);
      this.moduloService.getModulosPorUnidade(this.cadastroAcessoTO.idUnidade).subscribe(modulos => this.modulos = modulos);
  }

  limparCamposDependendentesUnidade() {
    this.cadastroAcessoTO.idUsuario =  null,
    this.cadastroAcessoTO.idModulo  =  null,
    this.cadastroAcessoTO.idGrupoModulo=  null
    
  }

  cadastrarAtualizar() {
    if (this.isAtualizar) {
      this.atualizar();
    }
    else { 
      this.cadastrar(); 
    }
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
    if (this.isAtualizar) {
      
      this.cadastroAcessoTO.idGrupoModulo = null

    } else {

      this.cadastroAcessoTO = {
        idUnidade: null,
        idUsuario: null,
        idModulo: null,
        idGrupoModulo: null
      }
    }
  }

  cancelar() {
    this.dialogRef.close();

  }

  buscarPerfis() {
    this.moduloService.getGrupoModulo(this.cadastroAcessoTO.idUnidade, this.cadastroAcessoTO.idModulo)
      .subscribe(perfis => this.perfis = perfis);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

}
