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

  subscribe(callback?) {
    this.language$.subscribe(lang => {
      this.translate.use(lang);
      if (callback) {
        callback(lang);
      }
    });
  }

  onLangChange(callback: Function) {
    this.translate.onLangChange.subscribe(value => {
      console.log(value);
      callback();
    });
  }

  getCurrentLang() {
    const langMap = {
      zh_CN: "Chinese",
      fr_FR: "French",
      es_US: "English",
      ar_EG: "Arabic",
      vi_VN: "Vietnamese"
    };
    return langMap[this.translate.currentLang] || "English";
  }
}
