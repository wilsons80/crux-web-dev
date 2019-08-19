import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatExpansionModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MenuAlterarComponent } from './menu-alterar/menu-alterar.component';
import { MenuCadastrarComponent } from './menu-cadastrar/menu-cadastrar.component';
import { MenuConfiguracoesComponent } from './menu-configuracoes/menu-configuracoes.component';
import { MenuConsultarComponent } from './menu-consultar/menu-consultar.component';
import { MenuDeletarComponent } from './menu-deletar/menu-deletar.component';
import { MenuPrincipalComponent } from './menu-principal.component';
import { MenuAlunosComponent } from './menu-alunos/menu-alunos.component';
import { MenuUnidadesComponent } from './menu-unidades/menu-unidades.component';
import { MenuCursosComponent } from './menu-cursos/menu-cursos.component';
import { SubMenusComponent } from './sub-menus/sub-menus.component';



@NgModule({
  declarations: [MenuPrincipalComponent, MenuConfiguracoesComponent, MenuCadastrarComponent, MenuAlterarComponent, MenuDeletarComponent, MenuConsultarComponent, MenuAlunosComponent, MenuUnidadesComponent, MenuCursosComponent, SubMenusComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    RouterModule

  ],
  exports: [MenuPrincipalComponent]
})
export class MenuPrincipalModule { }
