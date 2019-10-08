import { CadastroReservaAtividadeComponent } from './cadastro-reserva-atividade.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarCadastroReservaAtividadeComponent } from './cadastrar-cadastro-reserva-atividade/cadastrar-cadastro-reserva-atividade.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'cadastroreservaatividade/cadastrar', component: CadastrarCadastroReservaAtividadeComponent, canActivate: [AuthGuard] },
  { path: 'cadastroreservaatividade', component: CadastroReservaAtividadeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroReservaAtividadeRoutingModule { }
