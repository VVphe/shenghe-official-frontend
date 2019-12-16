import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonService } from "../common.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class NewsService extends CommonService {
  constructor(private http: HttpClient) {
    super();
  }

  getNewsList(params): Observable<any> {
    return this.http.get("/news/official/list", {
      params: this.getHttpParams(params)
    });
  }

  getNewsDetail(id: string, language: string): Observable<any> {
    return this.http.get("/news/official/detail", {
      params: this.getHttpParams({ id, language })
    });
  }
}
