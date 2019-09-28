import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarCargoComponent } from './cadastrar-cargo/cadastrar-cargo.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CargoComponent } from './cargo.component';


const routes: Routes = [
  { path: 'cargo/cadastrar', component: CadastrarCargoComponent,canActivate: [AuthGuard]},
  { path: 'cargo', component: CargoComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargoRoutingModule { }
