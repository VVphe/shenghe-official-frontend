import { Component, OnInit } from "@angular/core";
import { MENUS } from "../menus";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"]
})
export class HeaderComponent implements OnInit {
  menus: any[];

  constructor() {}

  ngOnInit() {
    this.menus = MENUS;
  }
}
