import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  counter$: Observable<number>;
   count = 60;

   constructor() {
    this.counter$ = timer(0,1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
  }

  ngOnInit() {
  }

}




   