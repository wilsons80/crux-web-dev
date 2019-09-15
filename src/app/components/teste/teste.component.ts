import { FileUtils } from './../../utils/file-utils';
import { ArquivoService } from './../../services/arquivo/arquivo.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {

  imageurl;
  constructor(
    private arquivoService:ArquivoService,
    private fileUtils:FileUtils
  ) { }

  ngOnInit() {
    this.arquivoService.get(4).subscribe((response:any) => {
      this.imageurl = this.fileUtils.convertBufferArrayToBase64(response);
    });
  }

}
