import { Component, OnInit, Input } from "@angular/core";
import { category } from "./category";

@Component({
  selector: "app-category-tree",
  templateUrl: "./category-tree.component.html",
  styleUrls: ["./category-tree.component.less"]
})
export class CategoryTreeComponent implements OnInit {
  @Input()
  categorys: category[] = [];

  @Input()
  allCount: number = 0;

  constructor() {}

  ngOnInit() {}
}
