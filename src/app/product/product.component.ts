import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductService } from "./product.service";
import { category } from "./category-tree/category";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryTreeComponent } from "./category-tree/category-tree.component";
import { NzToolTipComponent } from "ng-zorro-antd";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "../shared/language.service";

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

  query: string;
  category: string;
  categoryType: "all" | "group" | "leaf";
  lang: string = "English";
  power: number[];
  flux: number[];

  showFilter = true;
  tooltipStatus = "always";

  isFirstRouteByCategory = false;

  @ViewChild("categoryTree", { static: false })
  categoryTree: CategoryTreeComponent;

  get isList() {
    if (document.getElementsByClassName("ant-tooltip")) {
      for (
        let i = 0;
        i < document.getElementsByClassName("ant-tooltip").length;
        i++
      ) {
        const el = document.getElementsByClassName("ant-tooltip")[i];
        if (this.router.url.split("?")[0] === "/products") {
          el.classList.remove("hide");
        } else {
          el.classList.add("hide");
        }
      }
    }
    return this.router.url.split("?")[0] === "/products";
  }

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.lang = this.languageService.getCurrentLang();
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.router
      .navigate([], { queryParams: { ...queryParams, query: null } })
      .then(() => {
        this.activatedRoute.queryParams.subscribe(params => {
          if (params["query"]) {
            this.query = params["query"];
          } else {
            this.query = "";
          }
          this.category = "all";
          this.categoryType = "all";
          this.getProductList(true, true).then(() => {
            if (!this.categorys || !this.categorys.length) {
              this.getCategorys();
            }
            if (this.categoryTree) {
              this.categoryTree.select(
                this.categoryTree.selectedKey,
                this.categoryTree.categoryType
              );
            }
          });
        });
      });
    // this.activatedRoute.queryParams.subscribe(params => {
    //   if (params["query"]) {
    //     this.query = params["query"];
    //   } else {
    //     this.query = "";
    //   }
    //   this.category = "all";
    //   this.categoryType = "all";
    //   this.getProductList(true, true).then(() => {
    //     if (!this.categorys || !this.categorys.length) {
    //       this.getCategorys();
    //     }
    //     if (this.categoryTree) {
    //       this.categoryTree.select(
    //         this.categoryTree.selectedKey,
    //         this.categoryTree.categoryType
    //       );
    //     }
    //   });
    // });

    const langSwitchCb = lang => {
      this.lang =
        {
          es_ES: "Spanish",
          pt_PT: "Portuguese",
          es_US: "English"
        }[lang] || "English";
      this.getProductList(false, false);
      this.categorys = this.formatCategory(this.treeResult, this.lang);
    };

    this.languageService.subscribe(langSwitchCb);
  }

  getProductList(totalReset = false, countReset = false) {
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
      this.categorys = this.formatCategory(this.treeResult, this.lang);
      this.activatedRoute.queryParams.subscribe(params => {
        if (params["category"]) {
          this.category = this.findCategoryByName(params["category"]);
          console.log("params", this.category);
          this.categoryTree.selectedKey = this.category;
          this.categoryTree.categoryType = "group";
          if (this.categoryTree) {
            this.categoryTree.select(
              this.categoryTree.selectedKey,
              this.categoryTree.categoryType
            );
          }
        }
      });
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
        children: this.formatCategory(categorys[i].children || [], lang)
      });
    }
    return result;
  }

  findCategoryByName(category): string {
    return this.treeResult.filter(item =>
      Object.values(item.name).includes(category)
    )[0].id;
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

  handleToggleChange() {
    this.tooltipStatus = "never";
    setTimeout(() => {
      this.tooltipStatus = "always";
    });
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

  toDetail(id: string) {
    this.router.navigate(["/products/detail"], {
      queryParams: { id }
    });
  }
}
