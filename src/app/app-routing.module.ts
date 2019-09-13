import { UploadFotoComponent } from './components/common/upload-foto/upload-foto.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovaSenhaComponent } from './components/nova-senha/nova-senha.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadFotoComponent },
  { path: 'novasenha', component: NovaSenhaComponent, canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
