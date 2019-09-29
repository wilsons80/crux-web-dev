import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Talento } from 'src/app/core/talento';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { TalentosService } from 'src/app/services/talentos/talentos.service';

@Component({
  selector: 'app-talento',
  templateUrl: './talento.component.html',
  styleUrls: ['./talento.component.css']
})
export class TalentoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaTalento: Talento[];
  mostrarTabela: boolean = false;
  talento: Talento = new Talento();
  msg:string;

  displayedColumns: string[] = ['descricao', 'acoes'];
  dataSource: MatTableDataSource<Talento> = new MatTableDataSource();

  constructor(
    private talentoService: TalentosService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
    
  }
 

  limpar() {
    this.mostrarTabela = false;
    this.talento = new Talento()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.talento.id) {
      this.talentoService.getById(this.talento.id).subscribe((talento: Talento) => {
        if(!talento){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [talento];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
    
  }


  atualizar(talento: Talento) {
    this.router.navigate(['/talento/cadastrar'], { queryParams: { idTalento: talento.id } });
  }

  deletar(talento: Talento) {
    this.chamaCaixaDialogo(talento);
  }

  chamaCaixaDialogo(talento: Talento) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que desse excluir o talento?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.talentoService.excluir(talento.id).subscribe(() => {
          this.talento.id = null
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.talentoService.getAll().subscribe((listaTalento: Talento[]) => {
      this.listaTalento = listaTalento;
      this.dataSource.data = listaTalento ? listaTalento : [];
      this.verificaMostrarTabela(listaTalento);
    })
  }
  verificaMostrarTabela(talentos: Talento[]) {
    if(!talentos || talentos.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum talento cadastrado para o funcionário."
    }else{
      this.mostrarTabela = true; 
    }
  }

}
