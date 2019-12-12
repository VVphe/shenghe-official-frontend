import { Component, OnInit } from "@angular/core";
import { ProductService } from "./product.service";
import { category } from "./category-tree/category";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.less"]
})
export class ProductComponent implements OnInit {
  productList: any[];
  treeResult: any[] = [];
  categorys: category[];

  currentLang = "English";

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getCategorys();
  }

  getProductList(lang = "English") {
    this.productService.getProducts({});
  }

  getCategorys() {
    this.productService.getCategorys().subscribe(res => {
      const result: any[] = res.items.map(item => {
        return {
          ...item,
          children: []
        };
      });
      for (let i = 0; i < result.length; i++) {
        if (result[i].parent) {
          result
            .find(item => item.id === result[i].parent)
            .children.push(result[i]);
        } else {
          this.treeResult.push(result[i]);
        }
      }
      this.categorys = this.formatCategory(this.treeResult);
    });
  }

  formatCategory(categorys: any[], lang = "English"): category[] {
    const result: category[] = [];
    for (let i = 0; i < categorys.length; i++) {
      result.push({
        id: categorys[i].id,
        name: categorys[i].name[lang],
        isLeaf: !categorys[i].children || !categorys[i].children.length,
        count: categorys[i].count,
        parent: categorys[i].parent || null,
        expanded: true,
        children: this.formatCategory(categorys[i].children || [])
      });
    }
    return result;
  }
}
