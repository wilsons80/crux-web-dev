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
    
    
    if(this.novaSenha !== this.confirmacaoNovaSenha) {
      this.toastService.showAlerta("As novas senhas são diferentes.");
      return;
    }

    //TODO chamar o metodo do Backend
    this.toastService.showAlerta("Metodo não implementado no backend.");
    
  }
 
  
}
