import { PessoaFisica } from 'src/app/core/pessoa-fisica';
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

  @Input() dadosEndereco;

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
      this.dadosEndereco.uf       = endereco.uf;
      this.dadosEndereco.cidade   = endereco.localidade.toUpperCase() + ' ' + endereco.complemento.toUpperCase();
      this.dadosEndereco.bairro   = endereco.bairro.toUpperCase();
      this.dadosEndereco.endereco = endereco.logradouro.toUpperCase();
    } else {
      this.dadosEndereco.uf       = null;
      this.dadosEndereco.cidade   = null;
      this.dadosEndereco.bairro   = null;
      this.dadosEndereco.endereco = null;
      this.toastService.showAlerta('Cep inexistente ou endereço não encontrado.');
    }
  }

  onChangeCep() {
    if (this.dadosEndereco.cep && this.validaCep(this.dadosEndereco.cep)) {
      this.enderecoService.getEnderecoPorCep(this.dadosEndereco.cep).subscribe(
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
