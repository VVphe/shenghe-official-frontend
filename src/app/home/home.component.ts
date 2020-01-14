import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DeviceService } from "../shared/device.service";
import { NewsService } from "../news/news.service";
import { LanguageService } from "../shared/language.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"]
})
export class HomeComponent implements OnInit {
  isVisible = false;
  productIndex = 0;

  currentLang = "English";
  newsList = [];

  get isMobile() {
    return this.deviceService.isMobile;
  }

  constructor(
    private router: Router,
    private deviceService: DeviceService,
    private newsService: NewsService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.currentLang = this.languageService.getCurrentLang();
    this.newsService
      .getNewsList({
        start: 0,
        pageSize: 4,
        language: this.currentLang
      })
      .subscribe((result: any) => {
        this.newsList = result.items;
      });

    const langSwitchCb = lang => {
      this.currentLang =
        {
          zh_CN: "Chinese",
          fr_FR: "French",
          es_US: "English",
          ar_EG: "Arabic",
          vi_VN: "Vietnamese"
        }[lang] || "English";
      this.newsService
        .getNewsList({
          start: 0,
          pageSize: 4,
          language: this.currentLang
        })
        .subscribe((result: any) => {
          this.newsList = result.items;
        });
    };

    this.languageService.subscribe(langSwitchCb);
  }

  toProduct(category) {
    this.router.navigate(["/products"], {
      queryParams: {
        category
      }
    });
  }

  toNewsDetail(id) {
    this.router.navigate(["/news/detail"], {
      queryParams: {
        id
      }
    });
  }

  formatTimestamp(timestamp) {
    let date = new Date(timestamp);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    return `${y}.${m < 10 ? "0" + m : m}.${d < 10 ? "0" + d : d}`;
  }

  switchProduct(type) {
    this.router.navigate(["/products"], {
      queryParams: {
        category: type
      }
    });
  }

  pre() {
    if (this.productIndex > 0) this.productIndex--;
  }

  next() {
    if (this.productIndex < 2) this.productIndex++;
  }

  toProducts() {
    this.router.navigate(["/products"]);
  }

  toNews() {
    this.router.navigate(["news"]);
  }
}
