import { Component, OnInit, Input } from '@angular/core';
import { Turmas } from 'src/app/core/turmas';

@Component({
  selector: 'oficina',
  templateUrl: './oficina.component.html',
  styleUrls: ['./oficina.component.css']
})
export class OficinaComponent implements OnInit {

  @Input() turma: Turmas;
  
  constructor() { }

  ngOnInit() {
  }

}
