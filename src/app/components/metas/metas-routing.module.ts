import { CadastrarMetasComponent } from './cadastrar-metas/cadastrar-metas.component';
import { MetasComponent } from './metas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'metas/cadastrar', component: CadastrarMetasComponent,canActivate: [AuthGuard]},
  { path: 'metas', component: MetasComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetasRoutingModule { }
