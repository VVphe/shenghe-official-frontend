import { Injectable } from "@angular/core";
import { CommonService } from "src/app/common.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContactService extends CommonService {
  constructor(private http: HttpClient) {
    super();
  }

  submitContact(params = {}): Observable<any> {
    return this.http.post("/contact/email", params);
  }
}
