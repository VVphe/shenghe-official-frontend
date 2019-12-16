import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NewsService } from "../news.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-news-detail",
  templateUrl: "./news-detail.component.html",
  styleUrls: ["./news-detail.component.less"]
})
export class NewsDetailComponent implements OnInit {
  newsId: string;
  newsInfo = {};
  relatedNews = [];

  currentLang = "English";

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) this.newsId = params["id"];
      this.getNewsDetail(this.newsId, this.currentLang);
    });
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
