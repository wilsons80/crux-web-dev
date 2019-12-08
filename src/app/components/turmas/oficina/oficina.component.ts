import { Component, OnInit, Input } from '@angular/core';
import { Material } from 'src/app/core/material';

@Component({
  selector: 'oficina',
  templateUrl: './oficina.component.html',
  styleUrls: ['./oficina.component.css']
})
export class OficinaComponent implements OnInit {

  @Input() materiais: Material[];
  
  constructor() { }

  ngOnInit() {
  }

}
