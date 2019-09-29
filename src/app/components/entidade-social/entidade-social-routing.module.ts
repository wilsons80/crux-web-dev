import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntidadeSocialComponent } from './entidade-social.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarEntidadeSocialComponent } from './cadastrar-entidade-social/cadastrar-entidade-social.component';


const routes: Routes = [
  { path: 'entidadesocial/cadastrar', component: CadastrarEntidadeSocialComponent,canActivate: [AuthGuard]},
  { path: 'entidadesocial', component: EntidadeSocialComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadeSocialRoutingModule { }
