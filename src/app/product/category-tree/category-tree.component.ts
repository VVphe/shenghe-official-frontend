import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  Output,
  EventEmitter
} from "@angular/core";
import { category } from "./category";

@Component({
  selector: "app-category-tree",
  templateUrl: "./category-tree.component.html",
  styleUrls: ["./category-tree.component.less"]
})
export class CategoryTreeComponent implements OnInit {
  @Input()
  categorys: category[] = [];

  @Output()
  selectChange = new EventEmitter<any>();

  @Input()
  selectedKey: string = "all";

  get allCount() {
    if (!this.categorys) return;
    let count = 0;
    for (let i = 0; i < this.categorys.length; i++) {
      count += this.categorys[i].count;
    }
    return count;
  }

  constructor() {}

  ngOnInit() {}

  select(id: string, type: "all" | "group" | "leaf") {
    this.selectedKey = id;
    this.selectChange.emit({
      id,
      type
    });
  }
}
