import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NewsService } from "../news.service";
import { Location } from "@angular/common";
import { LanguageService } from "src/app/shared/language.service";

@Component({
  selector: "app-news-detail",
  templateUrl: "./news-detail.component.html",
  styleUrls: ["./news-detail.component.less"]
})
export class NewsDetailComponent implements OnInit {
  newsId: string;
  newsInfo: any;
  relatedNews = [];

  currentLang = "English";

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private location: Location,
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.currentLang = this.languageService.getCurrentLang();
    this.activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) this.newsId = params["id"];
      this.getNewsDetail(this.newsId, this.currentLang);
    });

    const langSwitchCb = lang => {
      this.currentLang =
        {
          es_ES: "Spanish",
          pt_PT: "Portuguese",
          es_US: "English"
        }[lang] || "English";
      this.getNewsDetail(this.newsId, this.currentLang);
    };

    this.languageService.subscribe(langSwitchCb);
  }

  getNewsDetail(id, lang) {
    this.newsService.getNewsDetail(id, lang).subscribe(res => {
      this.newsInfo = res.result;
      this.relatedNews = res.relateNews;
    });
  }

  formatTimestamp(timestamp) {
    let date = new Date(timestamp);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    return `${y}.${m < 10 ? "0" + m : m}.${d < 10 ? "0" + d : d}`;
  }

  toDetail(id: string) {
    this.router.navigate(["/news/detail"], {
      queryParams: { id }
    });
  }

  back() {
    this.location.back();
  }
}
