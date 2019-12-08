import { Turmas } from './../../../core/turmas';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oficina',
  templateUrl: './oficina.component.html',
  styleUrls: ['./oficina.component.css']
})
export class OficinaComponent implements OnInit {

  @Input() turma: Turmas[];
  
  constructor() { }

  ngOnInit() {
  }

}
