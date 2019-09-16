import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})

export class FileUtils {

    constructor(private domSanitizer:DomSanitizer){

    }
    
    convertBufferArrayToBase64(bufferArry:any){
        let TYPED_ARRAY = new Uint8Array(bufferArry);
        const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        let base64String = btoa(STRING_CHAR);
        console.log("opa", this.domSanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,` + base64String));
        return this.domSanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,` + base64String);
    }
}