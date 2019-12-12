import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "../common.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService extends CommonService {
  constructor(private http: HttpClient) {
    super();
  }

  getProducts(params = {}) {
    return this.http.get("/product/list", {
      params: this.getHttpParams(params)
    });
  }

  getCategorys(): Observable<any> {
    return this.http.get("/category/list", {
      params: {}
    });
  }
}
