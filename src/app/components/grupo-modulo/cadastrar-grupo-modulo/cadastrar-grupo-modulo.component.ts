import { PerfilAcessoService } from './../../../services/perfil-acesso/perfil-acesso.service';
import { GrupoModulo } from './../../../core/grupo-modulo';
import { Modulo } from 'src/app/core/modulo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosUnidades } from 'src/app/core/usuarios-unidades';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UsuarioUnidadeService } from 'src/app/services/usuario-unidade/usuario-unidade.service';
import { GrupoModuloService } from 'src/app/services/grupo-modulo/grupo-modulo.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { ModuloService } from 'src/app/services/modulo/modulo.service';
import { Unidade } from 'src/app/core/unidade';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'cadastrar-grupo-modulo',
  templateUrl: './cadastrar-grupo-modulo.component.html',
  styleUrls: ['./cadastrar-grupo-modulo.component.css']
})
export class CadastrarGrupoModuloComponent implements OnInit {


  ////////////////////////////////////////////////////////////////////////////
  // Campos de combos
  unidades: UsuariosUnidades[];
  modulos: Modulo[];
  perfisAcesso: PerfilAcesso[];

  grupoModulo: GrupoModulo = new GrupoModulo();
  grupoModulos: GrupoModulo[];

  ////////////////////////////////////////////////////////////////////////////

  acesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;


  constructor(private grupoModuloService: GrupoModuloService,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastService,
              private usuarioUnidadeService: UsuarioUnidadeService,
              private location: Location,
              private moduloService: ModuloService,
              private perfilAcessoService: PerfilAcessoService,
              private router: Router,
  ) {
    this.limpar();
  }

  ngOnInit() {
    this.acesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.acesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.acesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.usuarioUnidadeService.getUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: UsuariosUnidades[]) => {
      this.unidades = unidades;
    });

    this.moduloService.getAll().subscribe((modulos: Modulo[]) => {
      this.modulos = modulos;
    });

    this.perfilAcessoService.getAll().subscribe((perfisAcesso: PerfilAcesso[]) => {
      this.perfisAcesso = perfisAcesso;
    });

    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.grupoModuloService.getById(id).subscribe((grupoModulo: GrupoModulo) => {
        this.grupoModulo = grupoModulo;

        this.carregarGruposModulosDaUnidade();
      });
    }

  }

  carregarGruposModulosDaUnidade() {
    this.grupoModuloService.getAllByUnidade(this.grupoModulo.unidade.idUnidade).subscribe((grupoModulos: GrupoModulo[]) => {
      this.grupoModulos = grupoModulos;
    });
  }

  limpar() {
    this.grupoModulo = new GrupoModulo();
    this.grupoModulo.unidade = new Unidade();
    this.grupoModulo.modulo = new Modulo();
    this.grupoModulo.perfilAcesso = new PerfilAcesso();
  }


  cancelar() {
    this.router.navigate(['grupomodulo']);
  }


  mostrarBotaoLimpar() {
    if (this.isAtualizar) {return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }

  isJaAdicionada(): boolean {
    const grupoNovo = this.grupoModulos.find(grupo => grupo.modulo.id === this.grupoModulo.modulo.id
                                              &&
                                              grupo.unidade.idUnidade === this.grupoModulo.unidade.idUnidade
                                              &&
                                              grupo.perfilAcesso.id === this.grupoModulo.perfilAcesso.id 
                                              &&
                                              grupo.id !== this.grupoModulo.id);

    return !!grupoNovo;
  }


  cadastrar() {
    if (this.isJaAdicionada()) {
      this.toastService.showAlerta('Módulo já está cadastrado nessa unidade');
      return;
    }

    this.grupoModuloService.cadastrar(this.grupoModulo).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Módulo cadastrado com sucesso.');
    });
  }


  atualizar() {
    if (this.isJaAdicionada()) {
      this.toastService.showAlerta('Módulo já está cadastrado nessa unidade');
      return;
    }

    this.grupoModuloService.alterar(this.grupoModulo).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Módulo atualizado com sucesso.');
    });
  }
}
