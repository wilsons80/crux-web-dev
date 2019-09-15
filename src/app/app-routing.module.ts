import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovaSenhaComponent } from './components/nova-senha/nova-senha.component';
import { TesteComponent } from './components/teste/teste.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'novasenha', component: NovaSenhaComponent, canActivate: [AuthGuard]},
  { path: 'teste', component: TesteComponent, canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
