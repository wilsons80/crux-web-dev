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

  cadastroAcessoTO: CadastroAcessoTO = new CadastroAcessoTO();

  constructor(
    protected toolbarPrincipalService: ToolbarPrincipalService,
    private router:Router,
    private acessoService:AcessoService,
    private usuarioService:UsuarioService,
    private activatedRoute: ActivatedRoute,
    private moduloService:ModuloService,
    private toastService:ToastService,
    private dialogRef: MatDialogRef<CadastrarAcessoComponent>,
    @Inject(MAT_DIALOG_DATA) data
    ) {
      this.cadastroAcessoTO.idUnidade = data.idUnidade;
      this.modulos = data.modulos;
      this.usuarios = data.usuarios;
    }

  ngOnInit() {}

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
      idPerfil: null
    }
  }

  cancelar(){
    this.dialogRef.close();
    
  }

}
