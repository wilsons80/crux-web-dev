import { CadastrarPerspectivaComponent } from './cadastrar-perspectiva/cadastrar-perspectiva.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerspectivaComponent } from './perspectiva.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'perspectiva/cadastrar', component: CadastrarPerspectivaComponent,canActivate: [AuthGuard]},
  { path: 'perspectiva', component: PerspectivaComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerspectivaRoutingModule { }
