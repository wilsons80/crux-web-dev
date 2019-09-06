import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarProgramasComponent } from './cadastrar-programas/cadastrar-programas.component';
import { ProgramasComponent } from './programas.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'programas/cadastrar', component: CadastrarProgramasComponent,canActivate: [AuthGuard]},
  { path: 'programas', component: ProgramasComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramasRoutingModule { }
