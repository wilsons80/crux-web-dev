import { DepartamentoModule } from './components/departamento/departamento.module';
import { ModuloAdministrativoModule } from './components/menu-principal/modulo-administrativo/modulo-administrativo.module';
import { AcessoModule } from './components/acesso/acesso.module';
import { AlunoModule } from './components/aluno/aluno.module';
import { MenuPrincipalModule } from './components/menu-principal/menu-principal.module';
import { FormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { HomeModule } from './components/home/home.module';
import { MatIconModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatDialogModule, MatSidenavModule, MatMenuModule, MatExpansionModule, MatDividerModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './components/common/auth-interceptor/auth-interceptor';
import { HttpErrorToastComponent } from './components/common/http-error-toast/http-error-toast.component';
import { ExceptionHandlerModule } from './components/common/exception-handler/exception-handler.module';
import { HttpMgmtModule } from './components/common/http-mgmt/http-mgmt.module';
import { LoadingPopupModule } from './components/common/loading-popup/loading-popup.module';
import { PaginaNaoEncontradaComponent } from './components/common/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NovaSenhaModule } from './components/nova-senha/nova-senha.module';
import { ToolBarPrincipalModule } from './components/tool-bar-principal/tool-bar-principal.module';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { UploadFotoComponent } from './components/common/upload-foto/upload-foto.component';
import { ImageCropperModule } from 'ngx-image-cropper';

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  entryComponents: [
    HttpErrorToastComponent,
    ConfirmDialogComponent,
    UploadFotoComponent
  ],
  declarations: [
    AppComponent,
    HttpErrorToastComponent,
    PaginaNaoEncontradaComponent,
    ConfirmDialogComponent,
    UploadFotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LoginModule,
    HomeModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterModule,
    HttpClientModule,
    ExceptionHandlerModule,
    MatSnackBarModule,
    HttpMgmtModule,
    MatDialogModule,
    LoadingPopupModule,
    NovaSenhaModule,
    ToolBarPrincipalModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule,
    MatDividerModule,
    MenuPrincipalModule,
    AlunoModule,
    MatDialogModule,
    MatToolbarModule,
    AcessoModule,
    ImageCropperModule,
    MatCardModule,
    DepartamentoModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: LOCALE_ID, useValue: 'pt-BR' },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
