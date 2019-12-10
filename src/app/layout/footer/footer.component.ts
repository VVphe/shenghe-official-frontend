import { Component, OnInit } from "@angular/core";
import { MENUS } from "../menus";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.less"]
})
export class FooterComponent implements OnInit {
  menus: any[];

  constructor() {}

  ngOnInit() {
    this.menus = MENUS;
  }
}
