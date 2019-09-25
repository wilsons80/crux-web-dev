import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { LoadingIndicatorService } from 'src/app/services/loadingIndicator/loading-indicator.service';
import { LoadingPopupService } from './services/loadingPopup/loading-popup.service';
import { MenuPrincipalService } from './services/menuPrincipal/menu-principal.service';
import { ToolbarPrincipalService } from './services/toolbarPrincipal/toolbar-principal.service';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'crux-web-dev';

  data = new Date();
  teste = false;

  @ViewChild('menuPrincipal', { static: false }) menuPrincipal: MatDrawer;
  reason = '';

  showFiller = false;
  mostrarMenu: any;

  constructor(
    private menuPrincipalService: MenuPrincipalService,
    loadingIndicatorService: LoadingIndicatorService,
    loadingPopupService: LoadingPopupService,
    public toolbarPrincipalService: ToolbarPrincipalService,
    private authGuard: AuthGuard,
  ) {

    const subs = loadingIndicatorService.onLoadingChanged
      .subscribe(loading => {
        if (loading) {
          loadingPopupService.mostrarDialog();
        }
        if (!loading) {
          loadingPopupService.closeDialog();
        }
      });


  }

  ngOnInit(): void {
   
  
    this.authGuard.mostrarMenu.subscribe(resultado => this.mostrarMenu = resultado);

    this.menuPrincipalService.toggle.subscribe((resposta) => {
      if (resposta && resposta.logout == true) {
        this.close()
      } else
      this.teste = true
        // this.menuPrincipal.toggle()
    });
  }

  close() {
    this.menuPrincipal.close();
  }

}
