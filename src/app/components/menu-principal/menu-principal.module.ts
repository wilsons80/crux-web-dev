import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPrincipalComponent } from './menu-principal.component';
import { MatMenuModule, MatButtonModule, MatIconModule, MatExpansionModule, MatExpansionPanel, MatFormFieldModule, MatInputModule, MatRippleModule, MatDividerModule, MatListModule } from '@angular/material';
import { MenuConfiguracoesComponent } from './menu-configuracoes/menu-configuracoes.component';
import { MenuCadastroComponent } from './menu-cadastro/menu-cadastro.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MenuPrincipalComponent, MenuConfiguracoesComponent, MenuCadastroComponent],
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
  exports:[MenuPrincipalComponent]
})
export class MenuPrincipalModule { }
