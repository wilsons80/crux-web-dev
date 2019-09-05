import { CadastrarIniciativasComponent } from './cadastrar-iniciativas/cadastrar-iniciativas.component';
import { IniciativasComponent } from './iniciativas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'iniciativas/cadastrar', component: CadastrarIniciativasComponent,canActivate: [AuthGuard]},
  { path: 'iniciativas', component: IniciativasComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IniciativasRoutingModule { }
