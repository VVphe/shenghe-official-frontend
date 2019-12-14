import { Component, OnInit } from "@angular/core";
import { MENUS } from "../menus";
import { LANGUAGES } from "src/app/constants";
import { Router, ActivatedRoute } from "@angular/router";

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.menus = MENUS;
    this.language = this.languages[0];
    this.activatedRoute.queryParams.subscribe(params => {
      if (params["query"]) {
        this.showSearch = true;
        this.searchValue = params["query"];
      }
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    // if (!this.showSearch) {
    //   this.searchValue = "";
    //   this.router.navigate(["/products"], {
    //     queryParams: {
    //       query: this.searchValue
    //     }
    //   });
    // }
  }
  handleSearch(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.router.navigate(["/products"], {
        queryParams: {
          query: this.searchValue
        }
      });
    }
  }
}
