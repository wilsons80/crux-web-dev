import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarProjetoComponent } from './cadastrar-projeto/cadastrar-projeto.component';
import { ProjetoComponent } from './projeto.component';


const routes: Routes = [
  { path: 'projeto/cadastrar', component: CadastrarProjetoComponent, canActivate: [AuthGuard] },
  { path: 'projeto', component: ProjetoComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule { }
