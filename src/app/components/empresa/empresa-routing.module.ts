import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaComponent } from './empresa.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarEmpresaComponent } from './cadastrar-empresa/cadastrar-empresa.component';



const routes: Routes = [
  { path: 'empresa/cadastrar', component: CadastrarEmpresaComponent,canActivate: [AuthGuard]},
  { path: 'empresa', component: EmpresaComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
