import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { UsuarioComponent } from './usuario.component';


const routes: Routes = [
  { path: 'usuario/cadastrar', component: CadastrarUsuarioComponent, canActivate: [AuthGuard]},
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
