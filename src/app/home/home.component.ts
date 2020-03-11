import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DeviceService } from "../shared/device.service";
import { NewsService } from "../news/news.service";
import { LanguageService } from "../shared/language.service";
import Swiper from "swiper";

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

  bannerIdx = ["01", "02", "03", "04"];
  mobileBannerIdx = ["01", "02", "03"];
  size;

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

    this.size = this.getWindowWidth();
    setTimeout(() => {
      this.swiperInit();
    }, 0);
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

  // pre() {
  //   if (this.productIndex > 0) this.productIndex--;
  // }

  // next() {
  //   if (this.productIndex < 2) this.productIndex++;
  // }

  toProducts() {
    this.router.navigate(["/products"]);
  }

  toNews() {
    this.router.navigate(["news"]);
  }

  getWindowWidth(): number {
    let width = 0;
    if (window.innerWidth) {
      width = window.innerWidth;
    } else if (document.body && document.body.clientWidth) {
      width = document.body.clientWidth;
    }
    if (width >= 1280 && width < 1440) {
      return 1280;
    } else if (width >= 1440 && width < 1920) {
      return 1440;
    } else if (width >= 1920) {
      return 1920;
    }
    return 1280;
  }

  swiperInit() {
    // tslint:disable-next-line: no-unused-expression
    new Swiper(".swiper-container", {
      direction: "horizontal",
      loop: true,
      speed: 2000,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: false
      },
      observer: true,
      observeParents: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  }
}
