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

  @Output()
  toggleChange = new EventEmitter<any>();

  @Input()
  selectedKey: string = "all";

  @Input()
  count = {};
  @Input()
  total = 0;

  categoryType: "all" | "group" | "leaf" = "all";

  // get allCount() {
  //   if (!this.categorys) return;
  //   let count = 0;
  //   for (let i = 0; i < this.categorys.length; i++) {
  //     count += this.categorys[i].count;
  //   }
  //   return count;
  // }

  constructor() {}

  ngOnInit() {}

  select(id: string, type: "all" | "group" | "leaf") {
    this.selectedKey = id;
    this.categoryType = type;
    this.selectChange.emit({
      id,
      type
    });
  }

  toggle(category) {
    category.expanded = !category.expanded;
    this.toggleChange.emit();
  }

  calcTotalCount(index: number) {
    let result = 0;
    if (
      this.categorys[index].children &&
      this.categorys[index].children.length
    ) {
      for (let i = 0; i < this.categorys[index].children.length; i++) {
        result += this.count[this.categorys[index].children[i].id] || 0;
      }
    }
    return result;
  }
}
