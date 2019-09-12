import { Location } from '@angular/common';
import { GrupoModulo } from './../../../core/grupo-modulo';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ModuloService } from './../../../services/modulo/modulo.service';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { AcessoService } from './../../../services/acesso/acesso.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Component, OnInit, Inject } from '@angular/core';
import { CadastroAcesso } from 'src/app/core/cadastro-acesso';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsuarioUnidade } from 'src/app/core/usuario-unidade';
import { Modulo } from 'src/app/core/modulo';
import { AcessoUnidade } from 'src/app/core/acesso-unidade';

@Component({
  selector: 'app-cadastrar-acesso',
  templateUrl: './cadastrar-acesso.component.html',
  styleUrls: ['./cadastrar-acesso.component.css']
})
export class CadastrarAcessoComponent implements OnInit {


  usuarios: UsuarioUnidade[];
  modulos: Modulo[];
  perfis: GrupoModulo[];
  unidades: AcessoUnidade;
  isAtualizar: boolean = false;


  labelBotao: string;

  cadastroAcesso: CadastroAcesso = new CadastroAcesso();

  constructor(
    public toolbarPrincipalService: ToolbarPrincipalService,
    private acessoService: AcessoService,
    private moduloService: ModuloService,
    private toastService: ToastService,
    private unidadeService: UnidadeService,
    private usuarioService:UsuarioService,
    private route: ActivatedRoute,
    private location:Location,
  ) {}

  ngOnInit() {
    this.unidadeService.getUnidadesComAcesso().subscribe((acessoUnidade: AcessoUnidade) => this.unidades = acessoUnidade);

    this.cadastroAcesso.idGrupoModulo = this.route.snapshot.queryParams.idGrupoModulo ? this.route.snapshot.queryParams.idGrupoModulo : null;
    this.cadastroAcesso.idUnidade = this.route.snapshot.queryParams.idUnidade ? this.route.snapshot.queryParams.idUnidade : null;
    this.cadastroAcesso.idModulo = this.route.snapshot.queryParams.idModulo ? this.route.snapshot.queryParams.idModulo : null;

    if (this.cadastroAcesso.idGrupoModulo) {
      this.isAtualizar = true;
      this.buscarPerfis();
    }
  }

  unidadeSelecionada(){
    if (!this.isAtualizar) {
      this.limparCamposDependendentesUnidade();
    }
      this.usuarioService.getUsuariosPorUnidade(this.cadastroAcesso.idUnidade).subscribe((usuarios:UsuarioUnidade[]) => this.usuarios = usuarios);
      this.moduloService.getModulosPorUnidade(this.cadastroAcesso.idUnidade).subscribe((modulos:Modulo[]) => this.modulos = modulos);
  }

  limparCamposDependendentesUnidade() {
    this.cadastroAcesso.idUsuario =  null,
    this.cadastroAcesso.idModulo  =  null,
    this.cadastroAcesso.idGrupoModulo=  null
    
  }


  atualizar() {
    this.acessoService.alterar(this.cadastroAcesso).subscribe(() => {
      this.toastService.showSucesso("Usuário atualizado com sucesso");
    });
  }

  cadastrar() {
    this.acessoService.cadastrarAcesso(this.cadastroAcesso).subscribe(() => {
      this.toastService.showSucesso("Usuário Cadastrado com sucesso");
      this.location.back();
    });
  }

  limpar() {
    if (this.isAtualizar) {
      
      this.cadastroAcesso.idGrupoModulo = null

    } else {

      this.cadastroAcesso = {
        idUnidade: null,
        idUsuario: null,
        idModulo: null,
        idGrupoModulo: null
      }
    }
  }

  cancelar() {
    this.location.back();
  }

  buscarPerfis() {
    this.moduloService.getGrupoModulo(this.cadastroAcesso.idUnidade, this.cadastroAcesso.idModulo)
      .subscribe((perfis:GrupoModulo[]) => this.perfis = perfis);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

}
