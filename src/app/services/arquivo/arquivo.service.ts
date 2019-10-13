import { Cacheable } from 'ngx-cacheable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const rootPath = 'api/arquivounidade/';

const httpOptions = {
  'responseType'  : 'arraybuffer' as 'json'
   //'responseType'  : 'blob' as 'json'        //This also worked
};

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {

  constructor(private http: HttpClient) { }

  gravar(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(rootPath, formData);
  }

  gravarComIdUnidade(file: File, idUnidade: number) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${rootPath}/unidade/${idUnidade}`, formData);
  }
  alterar(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.put(rootPath, formData);
  }

  @Cacheable()
  get(idUnidade: number) {
    return this.http.get(rootPath + `${idUnidade}`, httpOptions);
  }



}


