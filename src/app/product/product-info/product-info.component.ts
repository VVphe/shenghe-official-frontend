import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-product-info",
  templateUrl: "./product-info.component.html",
  styleUrls: ["./product-info.component.less"]
})
export class ProductInfoComponent implements OnInit {
  @Input()
  info = {};

  constructor() {}

  ngOnInit() {}
}
