import { CadastrarColaboradoresProgramaComponent } from './cadastrar-colaboradores-programa/cadastrar-colaboradores-programa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradoresProgramaComponent } from './colaboradores-programa.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {path: 'colaboradoresprograma/cadastrar', component:CadastrarColaboradoresProgramaComponent, canActivate: [AuthGuard]},
  {path: 'colaboradoresprograma', component:ColaboradoresProgramaComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradoresProgramaRoutingModule { }
