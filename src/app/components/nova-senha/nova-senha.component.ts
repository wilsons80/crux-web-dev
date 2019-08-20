import { ToastService } from 'src/app/services/toast/toast.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css']
})
export class NovaSenhaComponent implements OnInit {

  login: String;
  senhaAtual: String;
  confirmacaoNovaSenha: String;
  novaSenha: String;

  
  constructor(
    private toastService:ToastService,
    private dialog: MatDialog
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
        //TODO chamar o metodo do Backend
        this.toastService.showAlerta("Metodo não implementado no backend.");
      } else {
        //this.dialogRefConfirma.close();
      }
    }
    );
  }

  alterarSenha(){
    
    if(this.novaSenha !== this.confirmacaoNovaSenha) {
      this.toastService.showAlerta("As novas senhas são diferentes.");
      return;
    }

   this.chamaCaixaDialogo();
    
  }
 
  
}
