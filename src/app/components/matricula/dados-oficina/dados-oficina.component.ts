import { Component, OnInit, Input } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';

@Component({
  selector: 'dados-oficina',
  templateUrl: './dados-oficina.component.html',
  styleUrls: ['./dados-oficina.component.css']
})
export class DadosOficinaComponent implements OnInit {

  @Input() oficina: Atividade;


  pinDataInicio = Date.now();
  pinDataDesvinculacao = Date.now();
  pinDescricao = Date.now();

  constructor() { }

  ngOnInit() {
  }

}
