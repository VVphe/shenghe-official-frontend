import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../product.service";
import { LANGUAGES } from "../../constants";
import { productParams } from "../constants";
import { Location } from "@angular/common";
import { LanguageService } from "src/app/shared/language.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.less"]
})
export class ProductDetailComponent implements OnInit {
  productInfo = {
    name: {},
    params: {},
    pictures: {
      product: "",
      dimensions: "",
      photometric1: "",
      photometric2: "",
      brand: "",
      realShooting: ""
    }
  };

  productId: string;
  languages = LANGUAGES;
  PARAMS = productParams;

  langType = "English";

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.langType = this.languageService.getCurrentLang();
    this.activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.productId = params["id"];
        this.getProductDetail();
      }
    });
    const langSwitchCb = lang => {
      this.langType =
        {
          zh_CN: "Chinese",
          fr_FR: "French",
          es_US: "English",
          ar_EG: "Arabic",
          vi_VN: "Vietnamese"
        }[lang] || "English";
    };

    this.languageService.subscribe(langSwitchCb);
  }

  getProductDetail() {
    this.productService.getProductDetail(this.productId).subscribe(res => {
      this.productInfo = res.data;
      for (let i = 0; i < this.languages.length; i++) {
        this.productInfo.params[this.languages[i].lang][
          "Power"
        ] = this.filterAssembly(
          this.productInfo.params[this.languages[i].lang]["Power"],
          "decode"
        );
        this.productInfo.params[this.languages[i].lang][
          "Flux (±10%)"
        ] = this.filterAssembly(
          this.productInfo.params[this.languages[i].lang]["Flux (±10%)"],
          "decode"
        );

        // 适配参数修改
        this.paramsModifyAdapter(
          this.productInfo.params[this.languages[i].lang],
          "new",
          "IP",
          1
        );
        this.paramsModifyAdapter(
          this.productInfo.params[this.languages[i].lang],
          "replace",
          "CRI",
          1,
          "Ra"
        );
      }
    });
  }

  filterAssembly(value: any, type: "encode" | "decode"): any {
    if (type === "encode") {
      const str = (value[0] || "").replace(",", "").replace(" ", "");
      if (str) {
        const valueMatch = str.match(/\d+/g);
        const unitMatch = str.match(/[a-zA-Z]+/g);
        const _value = valueMatch ? +valueMatch[0] : "";
        const unit = unitMatch ? unitMatch[0] : "";
        return {
          value: _value,
          unit
        };
      } else {
        return {
          value: "",
          unit: ""
        };
      }
    } else {
      if (value.value) {
        return [`${value.value} ${value.unit}`];
      } else {
        return [""];
      }
    }
  }

  identifyFun(index, item) {
    return index;
  }

  keysOf(value) {
    return Object.keys(value);
  }

  back() {
    this.location.back();
  }

  paramsModifyAdapter(
    obj: any,
    type: "new" | "replace",
    target: string,
    count: number,
    source?: string
  ) {
    if (type === "new" && !obj[target]) {
      obj[target] = Array(count).fill("");
    } else if (type === "replace") {
      if (obj[source]) {
        obj[target] = obj[source];
      }
    }
  }
}
