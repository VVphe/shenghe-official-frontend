import { Component, OnInit } from "@angular/core";
import { MENUS } from "../menus";
import { LANGUAGES } from "src/app/constants";
import { Router, ActivatedRoute } from "@angular/router";
import { LanguageService } from "src/app/shared/language.service";
import { TranslateService } from "@ngx-translate/core";
import { DeviceService } from "src/app/shared/device.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"]
})
export class HeaderComponent implements OnInit {
  menus: any[];
  languages = LANGUAGES;
  language: any;

  showSearch = false;
  searchValue = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private langService: LanguageService,
    private deviceService: DeviceService
  ) {}

  get isMobile() {
    return this.deviceService.isMobile;
  }

  get canSearch() {
    return (
      this.router.url.split("?")[0] === "/products" ||
      this.router.url.split("?")[0] === "/news"
    );
  }

  ngOnInit() {
    this.menus = MENUS;
    this.language = this.languages[0];
    console.log(this.activatedRoute);
    this.activatedRoute.queryParams.subscribe(params => {
      // if (params["query"]) {
      //   this.showSearch = true;
      //   this.searchValue = params["query"];
      // }
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  handleSearch(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.router.url.split("?")[0] === "/products") {
        this.router.navigate(["/products"], {
          queryParams: {
            query: this.searchValue
          }
        });
      } else if (this.router.url.split("?")[0] === "/news") {
        this.router.navigate(["/news"], {
          queryParams: {
            query: this.searchValue
          }
        });
      }
    }
  }

  switchProduct(type) {
    this.router.navigate(["/products"], {
      queryParams: {
        category: type
      }
    });
  }

  switchLanguage(lang) {
    this.language = lang;
    this.langService.emit(lang.config);
  }
}
