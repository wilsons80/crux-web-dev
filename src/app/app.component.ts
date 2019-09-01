import { LoadingPopupService } from './services/loadingPopup/loading-popup.service';
import { LoadingIndicatorService } from 'src/app/services/loadingIndicator/loading-indicator.service';
import { MenuPrincipalService } from './services/menuPrincipal/menu-principal.service';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { throttleTime } from 'rxjs/operators';
import { asyncScheduler } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'crux-web-dev';

  @ViewChild('menuPrincipal', { static: false }) menuPrincipal: MatDrawer;
  reason = '';

  showFiller = false;

  constructor(
    private menuPrincipalService: MenuPrincipalService,
    loadingIndicatorService:LoadingIndicatorService,
    loadingPopupService:LoadingPopupService
    ) { 
      
      const subs = loadingIndicatorService.onLoadingChanged
         .subscribe(loading => {
           if(loading){
            loadingPopupService.mostrarDialog();
           }
            if (!loading) {
              loadingPopupService.closeDialog();
            }
          });

    
  }

  ngOnInit(): void {
    this.menuPrincipalService.toggle.subscribe((resposta) => {
      if (resposta && resposta.logout==true) {
        this.close()
      }else
        this.menuPrincipal.toggle()
    });
  }

  close() {
    this.menuPrincipal.close();
  }

}
