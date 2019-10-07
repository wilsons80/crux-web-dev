import { Familiares } from 'src/app/core/familiares';
import { Component, OnInit, Input } from '@angular/core';
import { Aluno } from 'src/app/core/aluno';

@Component({
  selector: 'profissional',
  templateUrl: './profissional.component.html',
  styleUrls: ['./profissional.component.css']
})
export class ProfissionalComponent implements OnInit {

  @Input() familiar: Familiares;

  constructor() { }

  ngOnInit() {
  }

}
