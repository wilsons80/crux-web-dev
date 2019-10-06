import { AuthGuard } from './../../guards/auth.guard';
import { CadastrarDocumentoAtividadeComponent } from './cadastrar-documento-atividade/cadastrar-documento-atividade.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoAtividadeComponent } from './documento-atividade.component';


const routes: Routes = [
  {path: 'documentoatividade/cadastrar', component: CadastrarDocumentoAtividadeComponent, canActivate: [AuthGuard]},
  {path: 'documentoatividade', component: DocumentoAtividadeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentoAtividadeRoutingModule { }
