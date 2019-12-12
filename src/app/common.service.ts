import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  constructor() {}

  getHttpParams(params): HttpParams {
    let httpParams = new HttpParams();
    for (const key in params) {
      httpParams = httpParams.set(key, params[key]);
    }
    return httpParams;
  }
}
