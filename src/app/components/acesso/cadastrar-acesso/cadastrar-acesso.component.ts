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
  perfis: any;
  unidades: AcessoUnidade;
  usuario: any;
  isAtualizar: boolean;

  labelBotao: string;

  cadastroAcessoTO: CadastroAcesso = new CadastroAcesso();

  constructor(
    public toolbarPrincipalService: ToolbarPrincipalService,
    private acessoService: AcessoService,
    private moduloService: ModuloService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<CadastrarAcessoComponent>,
    private unidadeService: UnidadeService,
    private usuarioService:UsuarioService,
  ) {}

  ngOnInit() {
    this.unidadeService.getUnidadesComAcesso().subscribe((acessoUnidade: AcessoUnidade) => this.unidades = acessoUnidade);
    if(this.isAtualizar){
      this.buscarPerfis();
    }
  }

  unidadeSelecionada(){
    if (!this.isAtualizar) {
      this.limparCamposDependendentesUnidade();
    }
      this.usuarioService.getUsuariosPorUnidade(this.cadastroAcessoTO.idUnidade).subscribe((usuarios:UsuarioUnidade[]) => this.usuarios = usuarios);
      this.moduloService.getModulosPorUnidade(this.cadastroAcessoTO.idUnidade).subscribe((modulos:Modulo[]) => this.modulos = modulos);
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
