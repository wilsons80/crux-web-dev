import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovaSenhaComponent } from './components/nova-senha/nova-senha.component';
import { PaginaNaoEncontradaComponent } from './components/common/pagina-nao-encontrada/pagina-nao-encontrada.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'novasenha', component: NovaSenhaComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/home', pathMatch:'full'},
  { path: '**', component: PaginaNaoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
