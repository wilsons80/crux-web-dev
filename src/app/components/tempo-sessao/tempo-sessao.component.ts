import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'tempo-sessao',
  templateUrl: './tempo-sessao.component.html',
  styleUrls: ['./tempo-sessao.component.css']
})
export class TempoSessaoComponent implements OnInit {

  countDown;
  counter = 60;
  tick = 1000;


  ngOnInit() {
    this.countDown = timer(0,1000).pipe(
      take(this.counter),
      map(() => --this.counter))
      .subscribe((info) => console.log("info", info));
  }
}
