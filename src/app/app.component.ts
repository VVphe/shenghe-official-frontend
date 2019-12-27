import { Component, HostListener } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "./shared/language.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  title = "larix-official-frontend";

  constructor(
    private translate: TranslateService,
    private langService: LanguageService,
    private router: Router
  ) {
    this.translate.setDefaultLang("en_US");
    this.langService.subscribe();
    this.router.events.subscribe(event => {
      window.scrollTo(0, 0);
    });
  }
}
