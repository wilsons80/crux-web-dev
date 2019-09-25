import { TrocaSenha } from './../../core/troca-senha';
import { AutenticadorService } from './../../services/autenticador/autenticador.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Routes, Router } from '@angular/router';
import { LogoutService } from 'src/app/services/logout/logout.service';
@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css']
})
export class NovaSenhaComponent implements OnInit {

  trocaSenha:TrocaSenha = new TrocaSenha();
  confirmacaoNovaSenha: String;

  constructor(
    private toastService: ToastService,
    private dialog: MatDialog,
    private location: Location,
    private autenticadorService:AutenticadorService,
    private logoutService:LogoutService
  ) { }

  ngOnInit() {
  }

  chamaCaixaDialogo() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: 'Ao trocar a senha você terá que realizar o login novamente.',
      textoAuxiliar: 'Deseja continuar?',
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.autenticadorService.trocarSenha(this.trocaSenha).subscribe(() =>{
          this.logoutService.logout();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  alterarSenha() {
    if (this.trocaSenha.senhaNova !== this.confirmacaoNovaSenha) {
      this.toastService.showAlerta("As novas senhas são diferentes.");
      return;
    }
    this.chamaCaixaDialogo();
  }

  cancelar() {
    this.location.back();
  }


}
