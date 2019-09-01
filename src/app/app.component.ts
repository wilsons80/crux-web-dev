import { LoadingPopupService } from './services/loadingPopup/loading-popup.service';
import { LoadingIndicatorService } from 'src/app/services/loadingIndicator/loading-indicator.service';
import { MenuPrincipalService } from './services/menuPrincipal/menu-principal.service';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer, MatDialogRef, MatDialog } from '@angular/material';
import { throttleTime } from 'rxjs/operators';
import { asyncScheduler } from 'rxjs';
import { LoadingPopupComponent } from './components/common/loading-popup/loading-popup.component';

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

  dialogRef: MatDialogRef<any,any>;

  constructor(
    private menuPrincipalService: MenuPrincipalService,
    loadingIndicatorService:LoadingIndicatorService,
    public dialog: MatDialog
    ) { 
      const subs = loadingIndicatorService.onLoadingChanged
         .subscribe(loading => {
           console.log(loading);
           if(loading){
            this.dialogRef = this.dialog.open(LoadingPopupComponent, {
              disableClose: true
            })           
           }
            if (!loading) {
              this.dialogRef.close()
              subs.unsubscribe();
            }
          },
            () => subs.unsubscribe());

    
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
