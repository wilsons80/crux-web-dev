import { AutenticadorService } from './../../services/autenticador/autenticador.service';
import { TempoSessaoService } from './../../services/tempo-sessao/tempo-sessao.service';
import { TempoSessaoModule } from './tempo-sessao.module';
import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { TempoSessaoDialogComponent } from '../common/tempo-sessao-dialog/tempo-sessao-dialog.component';

@Component({
  selector: 'tempo-sessao',
  templateUrl: './tempo-sessao.component.html',
  styleUrls: ['./tempo-sessao.component.css']
})
export class TempoSessaoComponent implements OnInit {

  countDown;
  counter = 0;
  tick = 1000;

  constructor(
    private tempoSessaoService:TempoSessaoService,
    private autenticadorService:AutenticadorService,
    public dialog: MatDialog
    ){
      
  }

  ngOnInit() {
    this.autenticadorService.tempoSessao$.pipe(
      switchMap((info) => {
        this.counter = info.valor*60
        return timer(0,1000).pipe(
          take(this.counter),
          map(() => --this.counter))
      })
    ).subscribe((info) => {
        this.countDown = info;

        if(this.countDown === 30){
          this.openDialog();
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TempoSessaoDialogComponent, {
      width: '350px',
      disableClose: true,
      data: {tempo: this.countDown}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
