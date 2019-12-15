import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductService } from "./product.service";
import { category } from "./category-tree/category";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryTreeComponent } from "./category-tree/category-tree.component";

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
  pageSize = 2;

  total = 0;
  pageTotal = 0;
  count = {};
  productList = [];

  query: string;
  category: string;
  categoryType: "all" | "group" | "leaf";
  lang: string = "English";
  power: number[];
  flux: number[];

  showAfterQuery = true;

  @ViewChild("categoryTree", { static: false })
  categoryTree: CategoryTreeComponent;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProductList(true, true).then(() => this.getCategorys());
    this.activatedRoute.queryParams.subscribe(params => {
      if (params["query"]) {
        this.query = params["query"];
      } else {
        this.query = "";
      }
      this.category = "all";
      this.categoryType = "all";
      this.getProductList(true, true).then(() => {
        if (this.categoryTree) {
          this.categoryTree.select(
            this.categoryTree.selectedKey,
            this.categoryTree.categoryType
          );
        }
      });
    });
  }

  getProductList(totalReset = false, countReset = false) {
    this.showAfterQuery = false;
    return new Promise(resolve => {
      const params = {
        language: this.lang,
        start: (this.pageIndex - 1) * this.pageSize,
        pageSize: this.pageSize
      };
      if (this.category && this.category !== "all") {
        Object.assign(params, { category: this.category });
      }
      if (this.query) {
        Object.assign(params, { query: this.query });
      }
      if (this.categoryType && this.categoryType !== "all") {
        Object.assign(params, { categoryType: this.categoryType });
      }
      if (this.power) {
        Object.assign(params, { power: this.power });
      }
      if (this.flux) {
        Object.assign(params, { flux: this.flux });
      }
      this.productService.getProducts(params).subscribe(res => {
        this.productList = res.items;
        if (totalReset) {
          this.total = res.total;
        }
        this.pageTotal = res.total;
        if (countReset) {
          this.count = {};
          res.count.forEach(item => {
            this.count[item._id] = item.count;
          });
        }
        resolve();
        this.showAfterQuery = true;
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
    this.pageIndex = 1;
    this.category = value.id;
    this.categoryType = value.type;
    this.getProductList(false, false);
  }

  handlePageChange(page: number) {
    this.pageIndex = page;
    this.getProductList(false, false);
  }

  handleFilterChange({ value, type }) {
    if (type === "power") {
      this.power = value;
    }
    if (type === "flux") {
      this.flux = value;
    }
    this.category = "all";
    this.categoryType = "all";
    this.getProductList(true, true).then(() => {
      if (this.categoryTree) {
        this.categoryTree.select(
          this.categoryTree.selectedKey,
          this.categoryTree.categoryType
        );
      }
    });
  }

  toDetal(id: string) {
    this.router.navigate(["/products/detail"], {
      queryParams: { id }
    });
  }
}
