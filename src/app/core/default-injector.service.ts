import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class DefaultInjectorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let url = req.url;
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      url = environment.baseUrl + url; // 添加basicUrl地址
    }
    return next
      .handle(
        req.clone({
          url
        })
      )
      .pipe(
        mergeMap(
          (event: any): Observable<any> => {
            return of(event);
          }
        )
      );
  }
}
