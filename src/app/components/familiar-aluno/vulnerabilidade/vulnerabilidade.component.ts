import { Component, OnInit, Input } from '@angular/core';
import { Familiares } from 'src/app/core/familiares';

@Component({
  selector: 'vulnerabilidade',
  templateUrl: './vulnerabilidade.component.html',
  styleUrls: ['./vulnerabilidade.component.css']
})
export class VulnerabilidadeComponent implements OnInit {

  @Input() familiar: Familiares;

  openFormCadastro = true;

  constructor() {
  }

  ngOnInit() {
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }

}
