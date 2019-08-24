import { CadastroAcessoTO } from './../../core/cadastroAcessoTO';
import { AcessoService } from './../../services/acesso/acesso.service';
import { ControleMenuService } from './../../services/controle-menu/controle-menu.service';
import { ModuloService } from './../../services/modulo/modulo.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { CadastrarAcessoComponent } from './cadastrar-acesso/cadastrar-acesso.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import _ from 'lodash';


@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit {


  cadastroAcessoTO: CadastroAcessoTO = new CadastroAcessoTO();

  usuarios: any;
  modulos: any;

  mostrarTabela: boolean = false;

  displayedColumns: string[] = ['usuario', 'modulo', 'perfil', 'acoes'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private moduloService: ModuloService,
    private activatedRoute: ActivatedRoute,
    protected controleMenuService: ControleMenuService,
    private acessoService: AcessoService
  ) { }

  ngOnInit() {
    console.log("controle", this.controleMenuService);

    this.cadastroAcessoTO.idUnidade = this.activatedRoute.snapshot.params.idUnidade,
      this.usuarioService.getUsuariosPorUnidade(this.cadastroAcessoTO.idUnidade).subscribe(usuarios => {
        this.usuarios = usuarios;
      });

    this.moduloService.getModulosPorUnidade(this.cadastroAcessoTO.idUnidade).subscribe(modulos => {
      this.modulos = modulos;
    });

  }

  abrirDialogCadastrar(labelBotao: string, usuario, atualizar: boolean) {

    const dialogRef = this.dialog.open(CadastrarAcessoComponent, {
      width: '500px',
      data: {
        idUnidade: this.cadastroAcessoTO.idUnidade,
        usuarios: this.usuarios,
        modulos: this.modulos,
        labelBotao: labelBotao,
        usuario: usuario,
        atualizar: atualizar
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  consultar() {
    this.dataSource = new MatTableDataSource();

    this.acessoService.getPerfilAcesso(this.cadastroAcessoTO.idUnidade, this.cadastroAcessoTO.idUsuario, this.cadastroAcessoTO.idModulo)
      .subscribe((resposta: any) => {
        this.dataSource.data = resposta
      })

    this.mostrarTabela = true;

  }

  mostrarAcao(acao: string) {
    return this.controleMenuService.acessoModulos['ACESSO'][acao] == 'S'
  }

  limpar() {
    this.cadastroAcessoTO.idUsuario = null;
    this.cadastroAcessoTO.idModulo = null;
  }

  deletar(element){
    console.log(element);

    //TODO Fazer um pop-up, tirei para não excluir todos os acessos
    // this.acessoService.excluir(element.idUsuarioGrupo)
    // .subscribe();
  }
}
