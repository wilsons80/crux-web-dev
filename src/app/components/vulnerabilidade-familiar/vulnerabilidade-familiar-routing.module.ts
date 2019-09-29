import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VulnerabilidadeFamiliarComponent } from './vulnerabilidade-familiar.component';
import { CadastrarVulnerabilidadeFamiliarComponent } from './cadastrar-vulnerabilidade-familiar/cadastrar-vulnerabilidade-familiar.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'vulnerabilidadefamiliar/cadastrar', component: CadastrarVulnerabilidadeFamiliarComponent,canActivate: [AuthGuard]},
  { path: 'vulnerabilidadefamiliar', component: VulnerabilidadeFamiliarComponent,canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VulnerabilidadeFamiliarRoutingModule { }
