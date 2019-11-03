import { Component, OnInit, Input } from '@angular/core';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { of } from 'rxjs';

@Component({
  selector: 'cadastro-endereco',
  templateUrl: './cadastro-endereco.component.html',
  styleUrls: ['./cadastro-endereco.component.css']
})
export class CadastroEnderecoComponent implements OnInit {

  ufs: any[] = [
    {nome: 'DF'}
  ];

  @Input() cep;
  @Input() uf;
  @Input() endereco;
  @Input() cidade;
  @Input() bairro;

  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(private enderecoService: EnderecoService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.enderecoService.getAllEstados().subscribe((ufs: any) => {
      this.ufs = ufs;
    });
  }

  validaCep(cep) {
    const regex = /^\d{2}((?!000000).)*$/;
    return regex.test(cep);
  }

  enderecoBuilder(endereco) {
    if (endereco && endereco.sucesso) {
      this.uf       = endereco.uf;
      this.cidade   = endereco.localidade.toUpperCase() + ' ' + endereco.complemento.toUpperCase();
      this.bairro   = endereco.bairro.toUpperCase();
      this.endereco = endereco.logradouro.toUpperCase();
    } else {
      this.uf       = null;
      this.cidade   = null;
      this.bairro   = null;
      this.endereco = null;
      this.toastService.showAlerta('Cep inexistente ou endereço não encontrado.');
    }
  }

  onChangeCep() {
    if (this.cep && this.validaCep(this.cep)) {
      this.enderecoService.getEnderecoPorCep(this.cep).subscribe(
          (dados) => {
            this.enderecoBuilder(dados);
          },
          (err) => {
            this.enderecoBuilder(null);
            this.toastService.showAlerta('Ocorreu um erro ao buscar o endereço.');
          }
        );
    }

  }


}
