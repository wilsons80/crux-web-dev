import { UsuarioUnidadeService } from 'src/app/services/usuario-unidade/usuario-unidade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcessoUnidade } from 'src/app/core/acesso-unidade';
import { CadastroAcesso } from 'src/app/core/cadastro-acesso';
import { Modulo } from 'src/app/core/modulo';
import { Acesso } from 'src/app/core/acesso';
import { UsuarioUnidade } from 'src/app/core/usuario-unidade';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { GrupoModulo } from './../../../core/grupo-modulo';
import { AcessoService } from './../../../services/acesso/acesso.service';
import { ModuloService } from './../../../services/modulo/modulo.service';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { UsuariosUnidades } from 'src/app/core/usuarios-unidades';

@Component({
  selector: 'app-cadastrar-acesso',
  templateUrl: './cadastrar-acesso.component.html',
  styleUrls: ['./cadastrar-acesso.component.css']
})
export class CadastrarAcessoComponent implements OnInit {


  usuarios: UsuarioUnidade[];
  modulos: Modulo[];
  perfis: GrupoModulo[];
  unidades: UsuariosUnidades[];

  isAtualizar = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  labelBotao: string;

  cadastroAcesso: CadastroAcesso = new CadastroAcesso();

  constructor(
    private acessoService: AcessoService,
    private moduloService: ModuloService,
    private toastService: ToastService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usuarioUnidadeService: UsuarioUnidadeService
  ) { }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    this.usuarioUnidadeService.getUnidadesUsuarioLogadoTemAcesso()
      .subscribe((usuarioUnidade: UsuariosUnidades[]) => {
        this.unidades = usuarioUnidade;
    });

    this.cadastroAcesso.idGrupoModulo = this.activatedRoute.snapshot.queryParams.idGrupoModulo ? Number(this.activatedRoute.snapshot.queryParams.idGrupoModulo) : null;
    this.cadastroAcesso.idUnidade = this.activatedRoute.snapshot.queryParams.idUnidade ? Number(this.activatedRoute.snapshot.queryParams.idUnidade) : null;
    this.cadastroAcesso.idModulo = this.activatedRoute.snapshot.queryParams.idModulo ? Number(this.activatedRoute.snapshot.queryParams.idModulo) : null;
    this.cadastroAcesso.idUsuario = this.activatedRoute.snapshot.queryParams.idUsuario ? Number(this.activatedRoute.snapshot.queryParams.idUsuario) : null;

    if (this.cadastroAcesso.idGrupoModulo) {
      this.isAtualizar = true;
      this.buscarPerfis();
    }

    if (this.cadastroAcesso.idUnidade) {
      this.unidadeSelecionada();
    }
  }

  unidadeSelecionada() {

    console.log("opaaaa");
    
    if (!this.isAtualizar) {
      this.limparCamposDependendentesUnidade();
      this.moduloService.getModulosPorUnidade(this.cadastroAcesso.idUnidade).subscribe((modulos: Modulo[]) => this.modulos = modulos);
    } else {
      this.moduloService.getUsuariosPorUnidadeLogada().subscribe((modulos: Modulo[]) => this.modulos = modulos);
    }

    this.usuarioService.getUsuariosPorUnidade(this.cadastroAcesso.idUnidade).subscribe((usuarios: UsuarioUnidade[]) => this.usuarios = usuarios);
  }

  limparCamposDependendentesUnidade() {
    this.cadastroAcesso.idUsuario = null,
      this.cadastroAcesso.idModulo = null,
      this.cadastroAcesso.idGrupoModulo = null

  }


  atualizar() {
    this.acessoService.alterar(this.cadastroAcesso).subscribe(() => {
      this.toastService.showSucesso("Acesso atualizado com sucesso");
      this.router.navigate(['acesso'])
    });
  }

  cadastrar() {
    this.acessoService.cadastrarAcesso(this.cadastroAcesso).subscribe(() => {
      this.toastService.showSucesso("Acesso cadastrado com sucesso");
      this.router.navigate(['acesso'])
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
    this.router.navigate(['acesso'])
  }

  buscarPerfis() {
    this.moduloService.getGrupoModulo(this.cadastroAcesso.idUnidade, this.cadastroAcesso.idModulo)
      .subscribe((perfis: GrupoModulo[]) => {
        console.log("perfis", perfis)
        this.perfis = perfis});
  }


  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}
