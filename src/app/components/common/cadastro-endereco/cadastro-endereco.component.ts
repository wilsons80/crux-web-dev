import { Component, OnInit, Input } from '@angular/core';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';

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
  @Input() pontoreferencia;

  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(private enderecoService: EnderecoService) { }

  ngOnInit() {
    this.enderecoService.getAllEstados().subscribe((ufs: any) => {
      this.ufs = ufs;
    });
  }

}
