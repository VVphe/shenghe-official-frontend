import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";
import { CategoryTreeComponent } from "./category-tree/category-tree.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ProductComponent, CategoryTreeComponent],
  imports: [SharedModule, ProductRoutingModule]
})
export class ProductModule {}
