import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { 
   
  }

  ngOnInit() {
    console.log("this", this.activatedRoute);
    this.activatedRoute.data.subscribe((info) => console.log("info", info)
    )
  }

}
