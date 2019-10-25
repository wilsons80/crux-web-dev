import { EntidadesSociais } from './../../../core/entidades-sociais';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dados-entidade-social',
  templateUrl: './dados-entidade-social.component.html',
  styleUrls: ['./dados-entidade-social.component.css']
})
export class DadosEntidadeSocialComponent implements OnInit {

  @Input() entidadeSocial: EntidadesSociais;

  constructor() { }

  ngOnInit() {
  }

}
