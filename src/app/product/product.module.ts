import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";
import { CategoryTreeComponent } from "./category-tree/category-tree.component";
import { SharedModule } from "../shared/shared.module";
import { SliderComponent } from "./slider/slider.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ProductComponent, CategoryTreeComponent, SliderComponent],
  imports: [SharedModule, ProductRoutingModule, FormsModule]
})
export class ProductModule {}
