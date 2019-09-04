import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjetivoComponent } from './objetivo.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  { path: 'objetivo', component: ObjetivoComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjetivoRoutingModule {
}
