import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetoComponent } from './projeto.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  //{ path: 'programas/cadastrar', component: CadastrarProgramasComponent,canActivate: [AuthGuard]},
  { path: 'projeto', component: ProjetoComponent,canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule { }
