import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { HomeModule } from './components/home/home.module';
import { NovaSenhaComponent } from './components/nova-senha/nova-senha.component';
import { MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './components/common/auth-interceptor/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NovaSenhaComponent,
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
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
