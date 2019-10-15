import { Component, OnInit, Input } from '@angular/core';
import { ResponsaveisAluno } from 'src/app/core/responsaveis-aluno';
import { TipoResponsaveis } from 'src/app/core/tipo-responsaveis';

@Component({
  selector: 'responsavel',
  templateUrl: './responsavel.component.html',
  styleUrls: ['./responsavel.component.css']
})
export class ResponsavelComponent implements OnInit {

  @Input() responsavel: ResponsaveisAluno;
  
  tipoResponsavel: TipoResponsaveis = new TipoResponsaveis();
  
  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];


  constructor() { }

  ngOnInit() {
  }

}
