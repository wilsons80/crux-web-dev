import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(respError => {
        let msgErro = 'Ocorreu um erro interno.';
        if (respError.error && respError.error.error) {
          msgErro = respError.error.error;
        }

        let idErro = null;
        if (respError.error && respError.error.codigo) {
          idErro = respError.error.codigo;
        }

        this.toastService.showAlerta(msgErro, idErro);
        return throwError(respError);
      })
    );
  }

}
