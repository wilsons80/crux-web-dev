import { CadastrarTalentoComponent } from './cadastrar-talento/cadastrar-talento.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TalentoComponent } from './talento.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'talento/cadastrar', component: CadastrarTalentoComponent,canActivate: [AuthGuard]},
  { path: 'talento', component: TalentoComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalentoRoutingModule { }
