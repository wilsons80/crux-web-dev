import { CadastrarGrausInstrucaoComponent } from './cadastrar-graus-instrucao/cadastrar-graus-instrucao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrausInstrucaoComponent } from './graus-instrucao.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'grausinstrucao/cadastrar', component: CadastrarGrausInstrucaoComponent,canActivate: [AuthGuard]},
  { path: 'grausinstrucao', component: GrausInstrucaoComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrausInstrucaoRoutingModule { }
