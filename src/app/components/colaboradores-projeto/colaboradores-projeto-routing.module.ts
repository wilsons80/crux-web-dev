import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarColaboradoresProjetoComponent } from './cadastrar-colaboradores-projeto/cadastrar-colaboradores-projeto.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ColaboradoresProjetoComponent } from './colaboradores-projeto.component';


const routes: Routes = [
  {path: 'colaboradoresprojeto/cadastrar', component:CadastrarColaboradoresProjetoComponent, canActivate: [AuthGuard]},
  {path: 'colaboradoresprojeto', component:ColaboradoresProjetoComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradoresProjetoRoutingModule { }
