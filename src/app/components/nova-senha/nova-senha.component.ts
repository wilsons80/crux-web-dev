import { ToastService } from 'src/app/services/toast/toast.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private toastService:ToastService) { }

  ngOnInit() {
  }

  alterarSenha(){
    
    //TODO Ele deve ir la no back validar as credenciais do usuario
    //verificarUsuario();
    
    if(this.novaSenha !== this.confirmacaoNovaSenha) {
      this.toastService.showAlerta("As novas senhas são diferentes.");
      return;
    }

    if(this.senhaAtual === this.novaSenha) {
      this.toastService.showAlerta("A nova senha deve ser diferente da atual.");
      return;
    }
    //TODO chamar o metodo do Backend
    this.toastService.showAlerta("Metodo não implementado no backend.");
    
  }
 
  
}
