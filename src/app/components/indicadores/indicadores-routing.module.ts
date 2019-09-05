import { IndicadoresComponent } from './indicadores.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CadastrarIndicadoresComponent } from './cadastrar-indicadores/cadastrar-indicadores.component';


const routes: Routes = [
  { path: 'indicadores/cadastrar', component: CadastrarIndicadoresComponent,canActivate: [AuthGuard]},
  { path: 'indicadores', component: IndicadoresComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicadoresRoutingModule { }
