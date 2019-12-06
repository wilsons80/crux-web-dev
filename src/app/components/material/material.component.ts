import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Material } from 'src/app/core/material';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { MaterialService } from 'src/app/services/material/material.service';



@Component({
  selector: 'material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  materiais: Material[];
  mostrarTabela: boolean = false;
  material: Material = new Material();
  msg: string;


  displayedColumns: string[] = ['nome', 'codigoUnidadeMedida', 'nomeMaterialNotafiscal', 'acoes'];
  perfilAcesso: Acesso;


  dataSource: MatTableDataSource<Material> = new MatTableDataSource();

  constructor(
    private materialService: MaterialService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.material = new Material()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.material.id) {
      this.materialService.getById(this.material.id).subscribe((material: Material) => {
        if (!material) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [material];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(material: Material) {
    this.router.navigate(['/material/cadastrar'], { queryParams: { idMaterial: material.id } });
  }

  deletar(material: Material) {
    this.chamaCaixaDialogo(material);
  }

  chamaCaixaDialogo(material: Material) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a iniciativa ${material.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.materialService.excluir(material.id).subscribe(() => {
          this.material.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.materialService.getAll().subscribe((materiais: Material[]) => {
      this.materiais = materiais;
      this.dataSource.data = materiais ? materiais : [];
      this.verificaMostrarTabela(materiais);
    })
  }

  verificaMostrarTabela(materiais: Material[]) {
    if (!materiais || materiais.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma material cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }

}
