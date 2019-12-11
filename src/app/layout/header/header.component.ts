import { Component, OnInit } from "@angular/core";
import { MENUS } from "../menus";
import { LANGUAGES } from "src/app/constants";

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

  constructor() {}

  ngOnInit() {
    this.menus = MENUS;
    this.language = this.languages[0];
  }
}
