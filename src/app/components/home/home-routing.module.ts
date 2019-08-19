import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { EscolherUnidadeComponent } from '../unidade/escolher-unidade/escolher-unidade.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: EscolherUnidadeComponent, canActivate: [AuthGuard] },
  { path: 'home/:idUnidade', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
