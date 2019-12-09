import { Turmas } from './../../../core/turmas';
import { Component, OnInit, Input } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'oficina',
  templateUrl: './oficina.component.html',
  styleUrls: ['./oficina.component.css']
})
export class OficinaComponent implements OnInit {

  @Input() turma: Turmas;

  openFormCadastro = false;

  constructor() { }

  ngOnInit() {
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }



}
