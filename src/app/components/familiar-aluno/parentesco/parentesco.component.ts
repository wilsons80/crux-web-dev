import { Familiares } from 'src/app/core/familiares';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'parentesco',
  templateUrl: './parentesco.component.html',
  styleUrls: ['./parentesco.component.css']
})
export class ParentescoComponent implements OnInit {

  @Input() familiar: Familiares;



  constructor() { }

  ngOnInit() {
  }

}
