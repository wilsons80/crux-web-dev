import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-upload-foto',
  templateUrl: './upload-foto.component.html',
  styleUrls: ['./upload-foto.component.css']
})
export class UploadFotoComponent implements OnInit {
  
  nomeArquivo:string;

  constructor() { }

  ngOnInit() {
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  
  fileChangeEvent(event: any): void {
      console.log(event);
      this.nomeArquivo = event.target.files[0].name;
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      console.log("imageLoaded");
    }
    cropperReady() {
        console.log("cropperReady");
        // cropper ready
    }
    loadImageFailed() {
        console.log("loadImageFailed");
      // show message
  }

  salvar(){

  }

  cancelar(){
      
  }

}
