import { MenuPrincipalService } from './services/menuPrincipal/menu-principal.service';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'crux-web-dev';
  
  @ViewChild('menuPrincipal',{static: false}) menuPrincipal: MatDrawer;
  reason = '';

  showFiller = false;
  
  constructor(private menuPrincipalService:MenuPrincipalService){}

  ngOnInit(): void {
    this.menuPrincipalService.toggle.subscribe(() => this.menuPrincipal.toggle());
  }

  close(reason: string) {
    this.reason = reason;
    this.menuPrincipal.close();
  }
  
}
