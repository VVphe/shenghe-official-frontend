import { Component, OnInit } from "@angular/core";
import { ProductService } from "./product.service";
import { category } from "./category-tree/category";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.less"]
})
export class ProductComponent implements OnInit {
  treeResult: any[] = [];
  categorys: category[] = [];

  currentLang = "English";

  initSelected = "all";

  pageIndex = 1;
  pageSize = 20;

  total = 0;
  pageTotal = 0;
  count = {};
  productList = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProductList().then(() => this.getCategorys());
  }

  getProductList(lang = "English", category = "all", query = "") {
    return new Promise(resolve => {
      const params = {
        language: lang,
        start: (this.pageIndex - 1) * this.pageSize,
        pageSize: this.pageSize
      };
      if (category !== "all") {
        Object.assign(params, { category });
      }
      if (query) {
        Object.assign(params, { query });
      }
      this.productService.getProducts(params).subscribe(res => {
        this.productList = res.items;
        this.total = res.total;
        this.pageTotal = res.total;
        res.count.forEach(item => {
          this.count[item._id] = item.count;
        });
        resolve();
      });
    });
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
        // count:
        //   categorys[i].children && categorys[i].children.length
        //     ? this.calcCount(categorys[i].children)
        //     : categorys[i].count,
        parent: categorys[i].parent || null,
        expanded: true,
        children: this.formatCategory(categorys[i].children || [])
      });
    }
    return result;
  }

  // calcCount(nodes: any[]): number {
  //   let result = 0;
  //   for (let i = 0; i < nodes.length; i++) {
  //     result +=
  //       nodes[i].children && nodes[i].children.length
  //         ? this.calcCount(nodes[i].children)
  //         : nodes[i].count;
  //   }
  //   return result;
  // }

  handleSelectChange(value: { id: string; type: "all" | "group" | "leaf" }) {
    console.log(value);
  }
}
