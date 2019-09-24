import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { LoadingIndicatorService } from 'src/app/services/loadingIndicator/loading-indicator.service';
import { LoadingPopupService } from './services/loadingPopup/loading-popup.service';
import { MenuPrincipalService } from './services/menuPrincipal/menu-principal.service';
import { ToolbarPrincipalService } from './services/toolbarPrincipal/toolbar-principal.service';
import { onMainContentChange } from './animations/animations';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ onMainContentChange ]
})
export class AppComponent {
  title = 'crux-web-dev';

  data = new Date();

  public onSideNavChange: boolean;

  @ViewChild('menuPrincipal', { static: false }) menuPrincipal: MatDrawer;
  reason = '';

  showFiller = false;

  constructor(
    private menuPrincipalService: MenuPrincipalService,
    loadingIndicatorService: LoadingIndicatorService,
    loadingPopupService: LoadingPopupService,
    public toolbarPrincipalService: ToolbarPrincipalService,
    private _sidenavService: SidenavService
  ) {

    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res)
      this.onSideNavChange = res;
    })
    
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
   
    // this.menuPrincipalService.toggle.subscribe((resposta) => {
    //   if (resposta && resposta.logout == true) {
    //     this.close()
    //   } else
    //     this.menuPrincipal.toggle()
    // });
  }

  close() {
    this.menuPrincipal.close();
  }

}
