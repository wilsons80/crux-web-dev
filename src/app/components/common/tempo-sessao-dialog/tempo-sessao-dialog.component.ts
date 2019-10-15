import { Router } from '@angular/router';
import { AutenticadorService } from './../../../services/autenticador/autenticador.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { timer, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-tempo-sessao-dialog',
  templateUrl: './tempo-sessao-dialog.component.html',
  styleUrls: ['./tempo-sessao-dialog.component.css']
})
export class TempoSessaoDialogComponent implements OnInit, OnDestroy {
 

  sessaoExpirada = false;
  tempo:number
  tempoDown: number;

  sub:Subscription;

  constructor( 
    private router:Router,
    private autenticadorService:AutenticadorService,
    private dialogRef: MatDialogRef<TempoSessaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
     this.tempo = data.tempo;
  }

  ngOnInit() {
    timer(0,1000).pipe(
      take(this.tempo),
      map(() => --this.tempo)).subscribe((info)=> {
        this.tempoDown = info;
        if(this.tempoDown === 0){
          this.sessaoExpirada = true;
        }
      })
  }

  revalidarSessao(){
    this.autenticadorService.refreshToken();
    this.dialogRef.close();
  }

  login(){
    this.router.navigate(['login']);
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
