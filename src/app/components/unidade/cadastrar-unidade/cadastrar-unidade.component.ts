import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-unidade',
  templateUrl: './cadastrar-unidade.component.html',
  styleUrls: ['./cadastrar-unidade.component.css']
})
export class CadastrarUnidadeComponent implements OnInit {


  unidades:any[] = [
    {nomeCompleto: 'Josue' , idUnidade: 1}
]
 
  tiposUnidade:any[] = [
    {tipo: 'Matriz'},
    {tipo: 'Filial'},
]

situacoesImovel:any[] = [
  {tipo: 'Próprio'},
  {tipo: 'Concessão'},
  {tipo: 'Licença pra funcionamento'},
  {tipo: 'Outro'},
]

  constructor() { }

  ngOnInit() {
  }

}
