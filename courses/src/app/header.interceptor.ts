import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var bearer: string;
        if (localStorage.getItem('userToken') != null)
            bearer =
                localStorage.getItem('userToken') || ''
        else
            bearer = 'Bearer 111'

        const modifiedReq = req.clone({
            headers: req.headers.set('Authorization', bearer).set('Accept', 'application/json')
        });

        return next.handle(modifiedReq);
    }
}
