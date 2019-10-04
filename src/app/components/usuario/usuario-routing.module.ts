import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { UsuarioComponent } from './usuario.component';


const routes: Routes = [
  { path: 'usuariosistema/cadastrar', component: CadastrarUsuarioComponent, canActivate: [AuthGuard]},
  { path: 'usuariosistema', component: UsuarioComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
