import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})
export class LanguageService {
  language$ = new Subject<string>();

  constructor(private translate: TranslateService) {}

  emit(lang: string) {
    this.language$.next(lang);
  }

  subscribe() {
    this.language$.subscribe(lang => {
      this.translate.use(lang);
    });
  }

  onLangChange(callback: Function) {
    this.translate.onLangChange.subscribe(callback());
  }
}
