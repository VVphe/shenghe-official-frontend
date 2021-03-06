import { Component, OnInit } from "@angular/core";
import { CATEGORYS } from "./constants";
import { NewsService } from "./news.service";
import { Router, ActivatedRoute } from "@angular/router";
import { LanguageService } from "../shared/language.service";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.less"]
})
export class NewsComponent implements OnInit {
  categorys = CATEGORYS;

  query = "";
  currentCategory = "all";
  pageIndex = 1;
  pageSize = 10;
  total: number;

  newsList = [];

  currentLang = "English";

  constructor(
    private newsService: NewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.currentLang = this.languageService.getCurrentLang();
    this.router.navigate([], { queryParams: { query: null } }).then(() => {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params["category"]) {
          this.currentCategory = params["category"];
        }
        if (params["pageIndex"]) {
          this.pageIndex = params["pageIndex"];
        }
        if (params["query"]) {
          this.query = params["query"];
          this.currentCategory = "all";
          this.pageIndex = 1;
        } else {
          this.query = "";
        }
        this.getNewsList();
      });
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
      this.getNewsList();
    };

    this.languageService.subscribe(langSwitchCb);
  }

  getNewsList() {
    const params = {
      start: (this.pageIndex - 1) * this.pageSize,
      pageSize: this.pageSize,
      language: this.currentLang
    };
    if (this.currentCategory && this.currentCategory !== "all") {
      Object.assign(params, { category: this.currentCategory });
    }
    if (this.query) {
      Object.assign(params, { query: this.query });
    }
    this.newsService.getNewsList(params).subscribe((result: any) => {
      this.total = result.total;
      this.newsList = result.items;
    });
  }

  changeCategory(category: string) {
    this.currentCategory = category;
    this.pageIndex = 1;
    this.router.navigate(["/news"], {
      queryParams: {
        category: this.currentCategory,
        pageIndex: this.pageIndex
      }
    });
  }

  handlePageChange(pageNumber: number) {
    this.pageIndex = pageNumber;
    // this.getNewsList();
    this.router.navigate(["/news"], {
      queryParams: {
        category: this.currentCategory,
        pageIndex: this.pageIndex
      }
    });
  }

  toDetail(id: string) {
    this.router.navigate(["/news/detail"], {
      queryParams: { id }
    });
  }
}
