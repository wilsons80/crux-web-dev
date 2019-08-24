import { ModuloService } from './../../services/modulo/modulo.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { CadastrarAcessoComponent } from './cadastrar-acesso/cadastrar-acesso.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CadastroAcessoTO } from 'src/app/core/cadastroAcessoTO';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit {
  
  cadastroAcessoTO: CadastroAcessoTO = new CadastroAcessoTO();

  usuarios:any ;
  modulos:any;

  constructor(
    private dialog: MatDialog,
    private usuarioService:UsuarioService,
    private moduloService:ModuloService,
    private toolbarPrincipalService:ToolbarPrincipalService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit() {
    console.log(this.activatedRoute);
    
    this.cadastroAcessoTO.idUnidade = this.activatedRoute.snapshot.params.id,
    this.usuarioService.getUsuariosPorUnidade(this.cadastroAcessoTO.idUnidade).subscribe(usuarios => {
      console.log(usuarios)
      this.usuarios = usuarios;
    });

    this.moduloService.getModulosPorUnidade(this.cadastroAcessoTO.idUnidade).subscribe(modulos => {
      console.log(modulos)
      this.modulos = modulos;
    });
    
  }

  abrirDialogCadastrar(){
    const dialogRef = this.dialog.open(CadastrarAcessoComponent, {
      width: '500px',
      data: {
        idUnidade: this.cadastroAcessoTO.idUnidade,
        usuarios: this.usuarios,
        modulos: this.modulos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  consultar(){
    console.log("chamar o backend do consultar");
    
  }

  

}
